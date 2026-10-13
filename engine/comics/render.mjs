// node render.mjs [no ...] → out/NN-slug.png (1080×1350) + out/NN-slug.txt (the post text)
import { launch } from "./cdp.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

mkdirSync("out", { recursive: true });
const t = await launch({ port: 9391 });
await t.size(1080, 1350, false, 1);
await t.go(pathToFileURL(resolve("comic.html")).href, 600);
for (let i = 0; i < 100 && !(await t.eval("window.READY === true")); i++) await new Promise((r) => setTimeout(r, 100));
const want = process.argv.slice(2).map(Number);
for (const s of await t.eval("comic.list()")) {
  if (want.length && !want.includes(s.no)) continue;
  await t.eval(`comic.draw(${s.no})`);
  const base = `out/${String(s.no).padStart(2, "0")}-${s.slug}`;
  await t.shot(`${base}.png`);
  writeFileSync(`${base}.txt`, s.post + "\n");
  console.log(base);
}
t.close();
process.exit(0);
