// A phone-sized headless Chrome on motdang: emulated position at Tha Phae Gate, English UI,
// every non-GET request failed (no live share, no beacon, no rain report leaves the recorder),
// and nothing goes to LINE or any other app.
import { launch, sleep } from "./cdp.mjs";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

export const PHONE = { w: 400, h: 760, dpr: 2 };
export const HERE = { lat: 18.7877, lng: 98.9931, acc: 12 };   // Tha Phae Gate, a public square
const BLOCK = /line\.me|wa\.me|facebook\.com|t\.me\/|\/api\/live|workers\.dev\/rain|google-analytics|googletagmanager/;

export async function phone({ port = 9411, base = "https://motdang.net", lang = "en" } = {}) {
  const t = await launch({ port });
  await t.size(PHONE.w, PHONE.h, true, PHONE.dpr);
  await t.send("Emulation.setGeolocationOverride", { latitude: HERE.lat, longitude: HERE.lng, accuracy: HERE.acc });
  const origin = new URL(base).origin;
  await t.send("Browser.grantPermissions", { origin, permissions: ["geolocation"] }).catch(() => {});
  await t.send("Page.addScriptToEvaluateOnNewDocument", { source:
    `try{localStorage.setItem('md-lang',${JSON.stringify(lang)});localStorage.setItem('md-doodle-wc','off');}catch(e){}` });
  t.blocked = [];
  await t.send("Fetch.enable", { patterns: [{ urlPattern: "*", requestStage: "Request" }] });
  t.on((m) => {
    if (m.method !== "Fetch.requestPaused") return;
    const r = m.params.request, bad = !/^(GET|HEAD|OPTIONS)$/.test(r.method) || BLOCK.test(r.url);
    if (bad) { t.blocked.push(r.method + " " + r.url.slice(0, 120)); t.send("Fetch.failRequest", { requestId: m.params.requestId, errorReason: "BlockedByClient" }).catch(() => {}); }
    else t.send("Fetch.continueRequest", { requestId: m.params.requestId }).catch(() => {});
  });
  // the page must not open a new window either (LINE / Grab / Google links)
  await t.send("Page.addScriptToEvaluateOnNewDocument", { source: `window.open=function(){return null};` });
  t.base = base;
  t.taps = [];
  t.t0 = null;
  const now = () => (t.t0 == null ? 0 : (Date.now() - t.t0) / 1000);
  t.mark = (kind, x, y, extra = {}) => t.taps.push({ kind, t: +now().toFixed(3), x, y, ...extra });
  t.tap = async (x, y, hold = 90) => {
    t.mark("tap", x, y);
    await t.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await sleep(hold);
    await t.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  t.drag = async (x0, y0, x1, y1, ms = 600, steps = 24) => {
    t.mark("drag", x0, y0, { x1, y1, dur: ms / 1000 });
    await t.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y: y0 }] });
    for (let i = 1; i <= steps; i++) {
      const f = i / steps, e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      await sleep(ms / steps);
      await t.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 + (x1 - x0) * e, y: y0 + (y1 - y0) * e }] });
    }
    await t.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  // the centre of the first element matching a selector (optionally whose text matches), in CSS px
  t.where = async (sel, text) => t.eval(`(() => { const re = ${text ? `new RegExp(${JSON.stringify(text)})` : "null"};
    const el = [...document.querySelectorAll(${JSON.stringify(sel)})].find((e) => e.offsetParent !== null && (!re || re.test(e.textContent)));
    if (!el) return null; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
  t.tapOn = async (sel, text, hold) => { const p = await t.where(sel, text); if (!p) throw new Error("no " + sel + " " + (text || "")); await t.tap(p[0], p[1], hold); return p; };
  // screencast: every painted frame, with its own timestamp
  t.record = async (dir) => {
    rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
    const frames = []; t.frames = frames; t.dir = dir;
    t.on((m) => {
      if (m.method !== "Page.screencastFrame") return;
      const n = frames.length, f = `${dir}/${String(n).padStart(5, "0")}.jpg`;
      writeFileSync(f, Buffer.from(m.params.data, "base64"));
      frames.push({ t: +now().toFixed(3), f: f.split("/").pop() });
      t.send("Page.screencastFrameAck", { sessionId: m.params.sessionId }).catch(() => {});
    });
    t.t0 = Date.now();
    await t.send("Page.startScreencast", { format: "jpeg", quality: 88, maxWidth: PHONE.w * PHONE.dpr, maxHeight: PHONE.h * PHONE.dpr, everyNthFrame: 1 });
  };
  t.stop = async () => {
    await t.send("Page.stopScreencast"); await sleep(200);
    writeFileSync(`${t.dir}/clip.json`, JSON.stringify({ phone: PHONE, dur: now(), frames: t.frames, taps: t.taps, blocked: t.blocked }, null, 1));
    return t.frames.length;
  };
  return t;
}
export { sleep };
