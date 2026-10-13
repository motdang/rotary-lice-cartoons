// node render.mjs [--stills t1,t2,...] [--fps 30]
// Steps stage.html frame by frame into ffmpeg; adds a silent stereo track (Facebook wants one).
import { launch } from "./cdp.mjs";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const FPS = Number(arg("--fps", 30));
const stills = arg("--stills", null);
const out = "out/dropshipping-reel.mp4";
mkdirSync("out/stills", { recursive: true });

const t = await launch({ port: 9391 });
await t.size(1080, 1920, false, 1);
await t.go(pathToFileURL(resolve("stage.html")).href, 800);
for (let i = 0; i < 100 && !(await t.eval("window.READY === true")); i++) await new Promise((r) => setTimeout(r, 100));
const total = await t.eval("stage.build()");
console.log("total", total, "s");

if (stills) {
  for (const s of stills.split(",")) {
    await t.eval(`stage.render(${Number(s)})`);
    await t.shot(`out/stills/${s}.png`);
  }
  t.close(); process.exit(0);
}

const N = Math.round(total * FPS);
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error",
  "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
  "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
  "-shortest", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", out], { stdio: ["pipe", "inherit", "inherit"] });
const started = Date.now();
for (let f = 0; f < N; f++) {
  await t.eval(`stage.render(${f / FPS})`);
  const buf = await t.shot(null, { format: "jpeg", quality: 94 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 300 === 0) console.log(`${f}/${N} ${((Date.now() - started) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
t.close();
console.log("wrote", out, ((Date.now() - started) / 1000).toFixed(0), "s");
process.exit(0);
