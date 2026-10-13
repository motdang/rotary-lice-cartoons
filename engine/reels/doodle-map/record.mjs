// node record.mjs [clip ...] — records the live doodle map on a phone, one folder of frames per clip
// (clips/<name>/00000.jpg … + clip.json with frame times and every tap). Default: all clips.
// BASE=http://localhost:8791 records a local copy of docs/ instead of motdang.net.
import { phone, sleep, HERE } from "./phone.mjs";

const BASE = process.env.BASE || "https://motdang.net";
const MAP = "/sites/doodle-map/";
const CLIPS = {
  // the city at a glance, for the ribbon: a slow drift over the old city
  async open(t) {
    await t.go(BASE + MAP + "?v=18.7880,98.9890,26000", 6000);
    await t.record("clips/open"); await sleep(600);
    await t.drag(250, 470, 170, 420, 2600, 60);
    await sleep(1800);
  },
  // Loi Kroh: four shrines on one corner; tap one, read the card, open the Manual
  async spirit(t) {
    await t.go(BASE + MAP + "?v=18.7838,98.9968,90000", 6000);
    await t.record("clips/spirit"); await sleep(500);
    await t.tap(Number(process.env.SPX || 252), Number(process.env.SPY || 352));
    await sleep(2200);
    const at = await t.where("#card a", "Spirit House Manual");
    if (at) {
      t.mark("tap", at[0], at[1]);
      await t.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: at[0], y: at[1] }] }); await sleep(90);
      await t.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await sleep(3800);
      t.mark("cut", 0, 0, { what: "manual" });
      await t.eval(`document.getElementById('models').scrollIntoView({behavior: 'smooth'})`);
      await sleep(1800);
      for (let i = 0; i < 4; i++) { await t.drag(200, 600, 200, 330, 700, 20); await sleep(900); }
    } else { console.log("no manual link"); await sleep(2000); }
  },
  // Toilets on, then "near here" from where I stand
  async toilet(t) {
    await t.go(BASE + MAP + "?v=18.7877,98.9925,40000", 6000);
    await t.record("clips/toilet"); await sleep(500);
    await t.tapOn("#legend button", "^Toilets");
    await sleep(1800);
    await t.tapOn("button.loc");
    await sleep(2600);
    const wc = await t.where("#card [data-wc]");
    if (wc) { await t.tap(wc[0], wc[1]); } else console.log("no nearest-toilet line");
    await sleep(3200);
  },
  // the sky: tap the cartouche, read the next 12 hours, scrub the clock
  async rain(t) {
    await t.go(BASE + MAP + "?v=18.7900,98.9860,22000", 6000);
    await t.record("clips/rain"); await sleep(500);
    await t.tapOn(".cartouche");
    await sleep(2600);
    const s = await t.eval(`(() => { const r = document.querySelector('input[type=range]').getBoundingClientRect(); return [r.left, r.right, r.top + r.height / 2]; })()`);
    await t.drag(s[0] + 14, s[2], s[0] + (s[1] - s[0]) * .55, s[2], 2400, 60);
    await sleep(900);
    await t.drag(s[0] + (s[1] - s[0]) * .55, s[2], s[0] + (s[1] - s[0]) * .9, s[2], 1600, 40);
    await sleep(1400);
  },
  // Send → Where I am now → the link and the LINE button (the recorder fails every POST and every app link)
  async send(t) {
    await t.go(BASE + MAP + "?v=18.7877,98.9931,40000", 6000);
    await t.record("clips/send"); await sleep(600);
    const fab = await t.eval(`(() => { const b = [...document.querySelectorAll('button')].find((b) => /Send this page/.test(b.getAttribute('aria-label') || '')); if (!b) return null; const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
    if (!fab) throw new Error("no Send button");
    await t.tap(fab[0], fab[1]);
    await sleep(1500);
    await t.tapOn(".ls-big", "Where I am now");
    await sleep(2200);
    const line = await t.where(".ls-out a, .ls-out button", "LINE");
    if (line) { t.mark("tap", line[0], line[1], { fake: 1 }); }     // shown, never pressed
    await sleep(1600);
    t.link = await t.eval(`(() => { const a = [...document.querySelectorAll('.ls-out a')].map((a) => a.href).find((h) => /line\\.me/.test(h)); return a ? decodeURIComponent(a) : null; })()`);
    console.log("link", t.link);
  },
  // the other phone: the snapshot link opened by the delivery guy
  async arrive(t) {
    const ts = Math.round(Date.now() / 1000);
    await t.go(BASE + `/live.html?p=${HERE.lat.toFixed(6)},${HERE.lng.toFixed(6)},${HERE.acc},${ts}`, 6000);
    await t.record("clips/arrive"); await sleep(1200);
    t.mark('drag', 360, 330, {x1: 360, y1: 160, dur: 1.2}); await t.eval(`window.scrollBy({top: 170, behavior: 'smooth'})`); await sleep(3800);
  },
};

const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CLIPS);
let port = 9420;
for (const name of want) {
  const t = await phone({ port: port++, base: BASE });
  try {
    await CLIPS[name](t);
    const n = await t.stop();
    console.log(name, n, "frames", t.blocked.length ? "blocked: " + t.blocked.join(" | ") : "");
  } catch (e) { console.log(name, "FAILED", e.message); }
  t.close();
  await sleep(500);
}
process.exit(0);
