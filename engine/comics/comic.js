// Strip layout and props. A strip is four panels on a 1080×1350 page (Facebook's 4:5 feed shape).
// Each panel is drawn in its own 1000-wide space at reel scale, so lib.js sizes carry over unchanged.
const M = 28, GAP = 22, TOP = 112, FOOT = 58;
const PW = (W - 2 * M - GAP) / 2, PH = (H - TOP - FOOT - GAP) / 2, PS = PW / 1000, PV = PH / PS; // PV ≈ 1156
const IMG = {};
function loadImg(k, src) { return new Promise((ok) => { const i = new Image(); i.onload = () => { IMG[k] = i; ok(); }; i.onerror = ok; i.src = src; }); }

function stripPage(s) {
  x.fillStyle = K.paper; x.fillRect(0, 0, W, H);
  x.fillStyle = K.dot;
  for (let yy = 12; yy < H; yy += 26) for (let xx = (yy / 26 % 2) * 13; xx < W; xx += 26) { x.beginPath(); x.arc(xx, yy, 3, 0, 6.29); x.fill(); }
  x.fillStyle = K.paper; x.fillRect(0, 0, W, TOP - 10); x.fillRect(0, H - FOOT + 6, W, FOOT);
  txt(s.title, M, 42, {size: 44, align: 'left', color: '#B7243A'});
  txt(s.titleTh, M, 86, {size: 30, align: 'left', color: '#8A6A4A'});
  txt('มดแดง · motdang.net', W - M, 42, {size: 30, align: 'right', color: '#8A6A4A'});
  txt(`No. ${s.no}`, W - M, 84, {size: 26, align: 'right', color: '#8A6A4A', weight: 500});
  txt('NaN & Beer · แนน & เบียร์', W / 2, H - FOOT / 2 + 4, {size: 26, color: '#8A6A4A', weight: 500});
}
function cell(i, fill, draw) {
  const px = M + (i % 2) * (PW + GAP), py = TOP + Math.floor(i / 2) * (PH + GAP);
  x.save(); x.fillStyle = K.ink; x.fillRect(px + 8, py + 8, PW, PH);
  x.beginPath(); x.rect(px, py, PW, PH); x.clip();
  x.translate(px, py); x.scale(PS, PS);
  x.fillStyle = fill; x.fillRect(0, 0, 1000, PV);
  draw();
  x.restore();
  x.lineWidth = 6; x.strokeStyle = K.ink; x.strokeRect(px, py, PW, PH);
}

// ---------- scenery (panel space: 0..1000 × 0..PV) ----------
function sky(c = K.sky) { x.fillStyle = c; x.fillRect(0, 0, 1000, PV); }
function road(gy, c = K.road) {
  x.fillStyle = c; x.fillRect(0, gy, 1000, PV - gy);
  x.fillStyle = '#FFF'; for (let i = 0; i < 6; i++) x.fillRect(i * 200 + 20, gy + (PV - gy) * .55, 110, 12);
}
function pavement(gy, c = K.concrete) { x.fillStyle = c; x.fillRect(0, gy, 1000, PV - gy); x.strokeStyle = 'rgba(30,27,46,.18)'; x.lineWidth = 3; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 130, gy); x.lineTo(i * 130 - 60, PV); x.stroke(); } }
function shophouses(gy, h = 420, seed = 1) {         // a row of Chiang Mai shophouses
  const cols = ['#F2D7A6', '#E9B9A0', '#CFE3D0', '#F5E6C8', '#D9CBE8'];
  for (let i = 0; i < 5; i++) {
    const bx = i * 210 - 20, bh = h - rnd(i + seed) * 80;
    x.fillStyle = cols[(i + seed) % 5]; x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.rect(bx, gy - bh, 210, bh); x.fill(); x.stroke();
    x.fillStyle = '#8A8FA3'; x.fillRect(bx + 20, gy - 150, 170, 150);
    x.strokeStyle = '#6C7183'; x.lineWidth = 3; for (let k = 0; k < 9; k++) { x.beginPath(); x.moveTo(bx + 20, gy - 150 + k * 17); x.lineTo(bx + 190, gy - 150 + k * 17); x.stroke(); }
    for (const wx of [40, 120]) { x.fillStyle = '#BFE3F5'; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.rect(bx + wx, gy - bh + 40, 50, 70); x.fill(); x.stroke(); }
  }
  x.strokeStyle = K.ink; x.lineWidth = 3; x.beginPath(); x.moveTo(0, gy - h + 40); x.quadraticCurveTo(500, gy - h + 110, 1000, gy - h + 50); x.stroke();
  x.beginPath(); x.moveTo(0, gy - h + 70); x.quadraticCurveTo(500, gy - h + 140, 1000, gy - h + 80); x.stroke();
}
function suthep(gy, c = '#9CCB8E') {                // Doi Suthep on the skyline
  x.fillStyle = c; x.beginPath(); x.moveTo(0, gy); x.quadraticCurveTo(250, gy - 260, 520, gy - 300); x.quadraticCurveTo(800, gy - 250, 1000, gy - 120); x.lineTo(1000, gy); x.fill();
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(510, gy - 300); x.lineTo(520, gy - 345); x.lineTo(530, gy - 300); x.fill();
}

// ---------- props ----------
function camera(px, py, s = 1, flash = false) {
  x.save(); x.translate(px, py); x.scale(s, s); x.lineJoin = 'round';
  if (flash) { x.fillStyle = 'rgba(255,240,150,.85)'; x.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 60 : 130, a = i * Math.PI / 8; x.lineTo(Math.cos(a) * r, -30 + Math.sin(a) * r); } x.fill(); }
  x.fillStyle = '#2E2B3A'; x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.roundRect(-55, -40, 110, 76, 12); x.fill(); x.stroke();
  x.beginPath(); x.roundRect(-24, -54, 40, 16, 4); x.fill(); x.stroke();
  x.fillStyle = '#C9CED8'; x.beginPath(); x.arc(0, -2, 28, 0, 6.29); x.fill(); x.stroke();
  x.fillStyle = '#3B5B8C'; x.beginPath(); x.arc(0, -2, 17, 0, 6.29); x.fill();
  x.fillStyle = '#FFF'; x.beginPath(); x.arc(-6, -8, 5, 0, 6.29); x.fill();
  x.fillStyle = GOLD; x.fillRect(30, -34, 16, 9);
  x.restore();
}
function phone(px, py, s = 1, screen = null, rot = 0) {
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s);
  x.fillStyle = K.ink; x.beginPath(); x.roundRect(-34, -60, 68, 120, 12); x.fill();
  x.fillStyle = '#DDF3E6'; x.beginPath(); x.roundRect(-28, -52, 56, 100, 7); x.fill();
  if (screen) screen();
  x.restore();
}
// a neighbour, in the same flat style as the avatars. origin = hips
function folk(px, gy, s, o = {}) {
  const skin = o.skin || '#D9A27A', shirt = o.shirt || '#E8F0F8', pants = o.pants || '#3A3F55';
  const hands = o.hands || [[-70, 0], [70, 0]], hy = -214;
  x.save(); x.translate(px, gy - 100 * s); x.scale(s, s); x.lineCap = 'round';
  if (o.hair === 'bun') { x.fillStyle = '#2B2326'; x.beginPath(); x.arc(0, hy - 96, 34, 0, 6.29); x.fill(); x.beginPath(); x.arc(0, hy - 6, 92, Math.PI, 0); x.fill(); }
  for (const sd of [-1, 1]) {
    x.strokeStyle = skin; x.lineWidth = 20; x.beginPath(); x.moveTo(sd * 26, 50); x.lineTo(sd * 28, 80); x.stroke();
    x.fillStyle = '#2A1C18'; x.beginPath(); x.ellipse(sd * 32, 92, 28, 14, 0, 0, 6.29); x.fill();
    x.fillStyle = pants; x.beginPath(); x.moveTo(sd * 2, -14); x.lineTo(sd * 56, -14); x.lineTo(sd * 60, 66); x.lineTo(sd * 8, 66); x.closePath(); x.fill();
  }
  x.fillStyle = shirt; x.beginPath(); x.roundRect(-62, -124, 124, 132, [44, 44, 18, 18]); x.fill();
  if (o.vest) { x.fillStyle = o.vest; x.fillRect(-62, -110, 30, 118); x.fillRect(32, -110, 30, 118); x.fillStyle = '#FFF'; x.fillRect(-62, -40, 30, 10); x.fillRect(32, -40, 30, 10); }
  if (o.apron) { x.fillStyle = o.apron; x.beginPath(); x.roundRect(-44, -70, 88, 90, 10); x.fill(); }
  x.fillStyle = skin; x.fillRect(-18, -142, 36, 22);
  for (let i = 0; i < 2; i++) {
    const sd = i ? 1 : -1, [hx, hy2] = hands[i];
    x.strokeStyle = shirt; x.lineWidth = 28; x.beginPath(); x.moveTo(sd * 48, -100); x.lineTo(hx, hy2); x.stroke();
    x.fillStyle = skin; x.beginPath(); x.arc(hx, hy2, 16, 0, 6.29); x.fill();
  }
  x.fillStyle = skin; x.beginPath(); x.ellipse(0, hy + 6, 76, 84, 0, 0, 6.29); x.fill();
  const ey = hy - 4, dark = '#2A1C18';
  if (o.hair === 'short' || !o.hair) { x.fillStyle = o.hairColor || '#2B2326'; x.beginPath(); x.arc(0, hy - 6, 80, Math.PI * 1.08, Math.PI * 1.92); x.quadraticCurveTo(0, hy - 50, -74, hy - 30); x.fill(); }
  if (o.hair === 'bun') { x.fillStyle = '#2B2326'; x.beginPath(); x.arc(0, hy - 6, 82, Math.PI * 1.05, Math.PI * 1.95); x.quadraticCurveTo(0, hy - 56, -78, hy - 24); x.fill();
    if (o.grey) { x.strokeStyle = '#CFC8BE'; x.lineWidth = 6; x.beginPath(); x.arc(0, hy - 6, 70, Math.PI * 1.25, Math.PI * 1.6); x.stroke(); } }
  if (o.cap) { x.fillStyle = o.cap; x.beginPath(); x.arc(0, hy - 30, 82, Math.PI, 0); x.fill(); x.beginPath(); x.ellipse(52, hy - 34, 70, 16, -.08, 0, 6.29); x.fill();
    x.fillStyle = '#FFF'; x.beginPath(); x.arc(0, hy - 70, 16, 0, 6.29); x.fill(); }
  x.fillStyle = 'rgba(224,115,110,.35)'; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 46, ey + 36, 18, 10, 0, 0, 6.29); x.fill(); }
  const f = o.face || 'happy';
  for (const sd of [-1, 1]) {
    const ex = sd * 30;
    if (f === 'joy') { x.strokeStyle = dark; x.lineWidth = 6; x.beginPath(); x.arc(ex, ey + 6, 11, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); }
    else if (f === 'sleep') { x.strokeStyle = dark; x.lineWidth = 6; x.beginPath(); x.arc(ex, ey, 11, .2, Math.PI - .2); x.stroke(); }
    else { x.fillStyle = dark; x.beginPath(); x.arc(ex, ey, 9, 0, 6.29); x.fill(); }
    if (f === 'puzzled') { x.strokeStyle = dark; x.lineWidth = 5; x.beginPath(); x.moveTo(ex - 14, ey - 24 - sd * 6); x.lineTo(ex + 14, ey - 24 + sd * 6); x.stroke(); }
  }
  x.strokeStyle = '#8E3A3A'; x.lineWidth = 6;
  if (f === 'puzzled') { x.beginPath(); x.moveTo(-18, ey + 52); x.quadraticCurveTo(0, ey + 44, 18, ey + 54); x.stroke(); }
  else if (f === 'sleep') { x.beginPath(); x.ellipse(0, ey + 50, 8, 6, 0, 0, 6.29); x.stroke(); }
  else { x.fillStyle = '#8E3A3A'; x.beginPath(); x.moveTo(-26, ey + 42); x.quadraticCurveTo(0, ey + 50, 26, ey + 42); x.quadraticCurveTo(22, ey + 72, 0, ey + 72); x.quadraticCurveTo(-22, ey + 72, -26, ey + 42); x.fill(); }
  x.restore();
}
// the motdang bot: a red ant-box robot (มดแดง = red ant)
function bot(px, py, s = 1, o = {}) {
  x.save(); x.translate(px, py); x.scale(s, s); x.lineJoin = 'round';
  x.strokeStyle = K.ink; x.lineWidth = 6;
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 30, -90); x.quadraticCurveTo(d * 50, -150, d * 80, -160); x.stroke(); x.fillStyle = K.ink; x.beginPath(); x.arc(d * 80, -160, 10, 0, 6.29); x.fill(); }
  x.fillStyle = o.color || '#C8283C'; x.beginPath(); x.roundRect(-90, -100, 180, 150, 40); x.fill(); x.stroke();
  x.fillStyle = '#FFF4DE'; x.beginPath(); x.roundRect(-64, -72, 128, 80, 24); x.fill(); x.stroke();
  if (o.hearts) for (const d of [-1, 1]) { const hx = d * 30, hy = -36; x.fillStyle = K.pink; x.beginPath(); x.moveTo(hx, hy + 18); x.bezierCurveTo(hx - 30, hy - 4, hx - 14, hy - 26, hx, hy - 10); x.bezierCurveTo(hx + 14, hy - 26, hx + 30, hy - 4, hx, hy + 18); x.fill(); x.lineWidth = 3; x.stroke(); }
  else for (const d of [-1, 1]) { x.fillStyle = K.ink; x.beginPath(); x.arc(d * 28, -34, 12, 0, 6.29); x.fill(); x.fillStyle = '#FFF'; x.beginPath(); x.arc(d * 28 + 4, -38, 4, 0, 6.29); x.fill(); }
  if (o.arms) { x.strokeStyle = K.ink; x.lineWidth = 14; x.lineCap = 'round'; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(d * 88, -20); x.lineTo(d * 140, -90); x.stroke(); } }
  x.restore();
}
// Gai Chon (Michael), from his vector; bust centred at px, chin line near py
function gaichon(px, py, s = 1, shades = false) {
  const im = IMG[shades ? 'gcs' : 'gc']; if (!im) return;
  const d = 620 * s; x.drawImage(im, px - d / 2, py - d * .62, d, d);
}
function speedLines(x0, y0, x1, n = 6) { x.strokeStyle = 'rgba(30,27,46,.5)'; x.lineWidth = 6; x.lineCap = 'round'; for (let i = 0; i < n; i++) { const yy = y0 + i * 40; x.beginPath(); x.moveTo(x0 - rnd(i) * 80, yy); x.lineTo(x1 - rnd(i + 3) * 120, yy); x.stroke(); } }
function heart(px, py, r, c = K.pink) { x.fillStyle = c; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py + r); x.bezierCurveTo(px - r * 1.6, py - r * .2, px - r * .8, py - r * 1.4, px, py - r * .5); x.bezierCurveTo(px + r * .8, py - r * 1.4, px + r * 1.6, py - r * .2, px, py + r); x.fill(); x.stroke(); }
