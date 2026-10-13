// node probe.mjs <url> <out.png> [js-expression-to-print] — one look at a page on the phone
import { phone, sleep } from "./phone.mjs";
const [url, out, js] = process.argv.slice(2);
const base = process.env.BASE || "https://motdang.net";
const t = await phone({ port: 9450 + Math.floor(Math.random() * 40), base });
await t.go(base + url, Number(process.env.SETTLE || 5000));
if (js) console.log(JSON.stringify(await t.eval(js)));
await t.shot(out);
console.log("blocked", t.blocked);
t.close(); process.exit(0);
