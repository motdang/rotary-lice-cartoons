// The strips. Each: no, slug, title/titleTh, post (Facebook text, EN then TH), panels = 4 × [fill, draw].
// Panel space is 1000 wide × PV (≈1156) tall. standing(who, x, groundY, scale, {face, hands}) — hands are hips-relative.
const at = (px, gy, s, hx, hy) => [px + hx * s, gy - 100 * s + hy * s];
const B = (t, cx, cy, tx, ty, o = {}) => bubble(t, cx, cy, tx, ty, 1, {size: 54, ...o});
const CAP = (t, px, py, o = {}) => caption(t, px, py, 1, {size: 44, ...o});
// props sit beside the face, never over it
function shoots(who, px, gy, s, face = 'joy') {      // camera up at the side of the head
  standing(who, px, gy, s, {face, hands: [[80, -150], [150, -185]]});
  const [cx, cy] = at(px, gy, s, 135, -185); camera(cx, cy, s * .95, true);
}
function snapsPhone(who, px, gy, s, face = 'grin', side = 1) {   // phone held up beside the head
  standing(who, px, gy, s, {face, hands: side > 0 ? [[-60, -20], [140, -230]] : [[-140, -230], [60, -20]]});
  const [hx, hy] = at(px, gy, s, side * 140, -250); phone(hx, hy, s * .9, null, side * .15);
}
function readsPhone(who, px, gy, s, face = 'happy', screen = null) {  // phone at the chest
  standing(who, px, gy, s, {face, hands: [[30, -40], [80, -50]]});
  const [hx, hy] = at(px, gy, s, 55, -55); phone(hx, hy, s * .8, screen);
}

function patch(px, py, steam = true) {               // a fresh asphalt patch
  x.fillStyle = '#26232E'; x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.ellipse(px, py, 150, 44, 0, 0, 6.29); x.fill(); x.stroke();
  x.fillStyle = 'rgba(255,255,255,.12)'; x.beginPath(); x.ellipse(px - 30, py - 10, 70, 14, 0, 0, 6.29); x.fill();
  if (steam) { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 7; x.lineCap = 'round';
    for (const d of [-70, 0, 70]) { x.beginPath(); x.moveTo(px + d, py - 30); x.bezierCurveTo(px + d - 24, py - 70, px + d + 24, py - 100, px + d, py - 140); x.stroke(); } }
}
function spool(px, py, s = 1) {
  x.save(); x.translate(px, py); x.scale(s, s); x.fillStyle = K.pink; x.strokeStyle = K.ink; x.lineWidth = 5;
  x.beginPath(); x.ellipse(0, 0, 46, 46, 0, 0, 6.29); x.fill(); x.stroke();
  x.fillStyle = '#FFF4DE'; x.beginPath(); x.arc(0, 0, 14, 0, 6.29); x.fill(); x.stroke();
  x.strokeStyle = K.ink; x.lineWidth = 22; x.lineCap = 'round'; x.beginPath(); x.moveTo(40, 20); x.quadraticCurveTo(110, 60, 150, 10); x.stroke();
  x.strokeStyle = K.pink; x.lineWidth = 14; x.stroke(); x.restore();
}
function shovel(px, py, s = 1) {
  x.save(); x.translate(px, py); x.scale(s, s); x.strokeStyle = '#8A5A2B'; x.lineWidth = 12; x.lineCap = 'round';
  x.beginPath(); x.moveTo(0, -260); x.lineTo(0, 40); x.stroke();
  x.fillStyle = '#9AA0AE'; x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.moveTo(-40, 30); x.lineTo(40, 30); x.lineTo(30, 120); x.quadraticCurveTo(0, 140, -30, 120); x.closePath(); x.fill(); x.stroke();
  x.restore();
}
function zzz(px, py) { txt('z', px, py, {size: 40, color: '#5A6A8A'}); txt('Z', px + 30, py - 40, {size: 56, color: '#5A6A8A'}); }
function gasStation(gy) {
  x.fillStyle = '#F7F2E8'; x.fillRect(0, 0, 1000, gy);
  x.fillStyle = '#C8283C'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(-10, 60, 1020, 90); x.fill(); x.stroke();
  x.fillStyle = '#FFF'; x.fillRect(-10, 120, 1020, 14);
  for (const px of [120, 880]) { x.fillStyle = '#E3E8EF'; x.beginPath(); x.rect(px - 22, 150, 44, gy - 150); x.fill(); x.stroke(); }
  x.fillStyle = '#DCD6CA'; x.fillRect(0, gy, 1000, PV - gy);
}
function airPump(px, gy, s = 1, screen = '32') {
  x.save(); x.translate(px, gy); x.scale(s, s); x.lineJoin = 'round'; x.strokeStyle = K.ink; x.lineWidth = 6;
  x.fillStyle = '#E8384F'; x.beginPath(); x.roundRect(-80, -420, 160, 420, 18); x.fill(); x.stroke();
  x.fillStyle = '#1E2A20'; x.beginPath(); x.roundRect(-58, -380, 116, 80, 10); x.fill(); x.stroke();
  txt(screen, 0, -340, {size: 54, color: '#7CFF9A', face: 'monospace'});
  x.fillStyle = '#FFF4DE'; x.beginPath(); x.roundRect(-64, -272, 128, 54, 8); x.fill(); x.stroke();
  txt('ลม · AIR', 0, -245, {size: 26});
  for (let i = 0; i < 3; i++) { x.fillStyle = ['#FFD23F', '#6FD6BE', '#FFF'][i]; x.beginPath(); x.arc(-34 + i * 34, -180, 13, 0, 6.29); x.fill(); x.stroke(); }
  x.strokeStyle = K.ink; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(70, -120); x.bezierCurveTo(200, -100, 160, 10, 240, -10); x.stroke();
  x.strokeStyle = '#3A3F55'; x.lineWidth = 8; x.stroke();
  x.restore();
}
function stall(gy) {                                  // amulet stall: tables of little glass cases under an umbrella
  x.fillStyle = '#F2E4C8'; x.fillRect(0, 0, 1000, gy);
  x.fillStyle = '#E8384F'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.moveTo(-40, 240); x.quadraticCurveTo(500, -40, 1040, 240); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = '#FFF'; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-40 + i * 270, 240); x.quadraticCurveTo(95 + i * 270, 100, 230 + i * 270, 240); x.lineTo(95 + i * 270, 200); x.fill(); }
  x.fillStyle = '#B5895A'; x.beginPath(); x.rect(0, gy - 190, 1000, 190); x.fill(); x.stroke();
  for (let i = 0; i < 8; i++) {
    const cx = 60 + i * 120; x.fillStyle = 'rgba(220,240,255,.8)'; x.beginPath(); x.rect(cx - 46, gy - 250, 92, 64); x.fill(); x.stroke();
    for (let k = 0; k < 3; k++) { x.fillStyle = [GOLD, '#8A8FA3', '#C9A26A'][(i + k) % 3]; x.beginPath(); x.roundRect(cx - 38 + k * 27, gy - 238, 20, 30, [10, 10, 3, 3]); x.fill(); x.lineWidth = 2; x.stroke(); x.lineWidth = 6; }
  }
}
function handSign(px, py, s, lines) {
  x.save(); x.translate(px, py); x.scale(s, s); x.rotate(-.05);
  x.fillStyle = '#FFF8E6'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(-190, -150, 380, 300); x.fill(); x.stroke();
  lines.forEach((l, i) => txt(l, 0, -90 + i * 66, {size: i ? 46 : 56, color: i ? '#1E3A8A' : '#B7243A'}));
  x.restore();
}
function snap(px, py, w, h, rot, draw) {            // a little photo print
  x.save(); x.translate(px, py); x.rotate(rot);
  x.fillStyle = K.ink; x.fillRect(-w / 2 + 8, -h / 2 + 8, w, h);
  x.fillStyle = '#FFF'; x.fillRect(-w / 2, -h / 2, w, h + 34); x.strokeStyle = K.ink; x.lineWidth = 4; x.strokeRect(-w / 2, -h / 2, w, h + 34);
  x.save(); x.beginPath(); x.rect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24); x.clip(); x.translate(-w / 2 + 12, -h / 2 + 12); draw(w - 24, h - 24); x.restore();
  x.restore();
}
function store(gy, glow = true) {                    // a corner convenience store at night
  x.fillStyle = '#1B2347'; x.fillRect(0, 0, 1000, gy);
  for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(255,255,255,.7)'; x.beginPath(); x.arc(rnd(i) * 1000, rnd(i + 50) * 260, 3, 0, 6.29); x.fill(); }
  if (glow) { x.fillStyle = 'rgba(255,248,200,.18)'; x.beginPath(); x.ellipse(500, gy - 200, 600, 340, 0, 0, 6.29); x.fill(); }
  x.fillStyle = '#FBFBF6'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(80, gy - 560, 840, 560); x.fill(); x.stroke();
  for (const [c, yy] of [['#F28C28', 0], ['#2E9E5B', 30], ['#D7263D', 60]]) { x.fillStyle = c; x.fillRect(80, gy - 560 + 40 + yy, 840, 30); }
  x.fillStyle = '#FFF6C9'; x.beginPath(); x.rect(150, gy - 380, 700, 380); x.fill(); x.stroke();
  x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.moveTo(500, gy - 380); x.lineTo(500, gy); x.stroke();
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { x.fillStyle = [K.pink, K.yellow, K.mint, K.orange, '#6FA8FF', '#FFF'][(r + c) % 6]; x.fillRect(180 + c * 50 + (c > 2 ? 380 : 0), gy - 340 + r * 70, 36, 44); }
}
function popsicle(px, py, rot, c) { x.save(); x.translate(px, py); x.rotate(rot); x.fillStyle = '#E8C99A'; x.fillRect(-6, 20, 12, 50); x.fillStyle = c; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.roundRect(-24, -60, 48, 86, [24, 24, 6, 6]); x.fill(); x.stroke(); x.restore(); }

const STRIPS = [
// ── 1 ───────────────────────────────────────────────────────────────────
{no: 1, slug: 'pothole', title: 'Grand Opening', titleTh: 'พิธีเปิด',
 post: 'Grand opening: one pothole, patched. Ribbon from under the seat.\nพิธีเปิดหลุมที่ปะแล้วหนึ่งหลุม ริบบิ้นเก็บไว้ใต้เบาะ\n\nmotdang.net/roadworks',
 panels: [
  ['#BFE6F8', () => {
    shophouses(700, 440, 1); pavement(700); road(800);
    scooter(BEER, 120, 1120, .55, 0); patch(640, 980);
    standing(NAN, 330, 1100, .95, {face: 'joy', hands: [[-70, -10], [170, -150]]});
    standing(BEER, 850, 1110, .9, {face: 'shock', hands: [[-62, -200], [62, -200]]});
    B('THEY FIXED\nTHE POTHOLE!!\nหลุมหายแล้ว!!', 330, 210, 330, 520, {size: 56});
    B('No way!\nจริงดิ!?', 790, 470, 840, 640);
  }],
  ['#F6EBD6', () => {
    pavement(820, '#E3D6BC');
    scooter(BEER, 360, 1110, 1.25, 0);
    standing(BEER, 740, 1120, 1, {face: 'grin', hands: [[-110, -40], [120, -240]]});
    const [sx, sy] = at(740, 1120, 1, 120, -240); scissors(sx, sy, 170, -1.3, .6);
    const [rx, ry] = at(740, 1120, 1, -110, -40); spool(rx - 30, ry, .9);
    CAP('Beer keeps a ribbon\nunder the seat.\nเบียร์พกริบบิ้นไว้ใต้เบาะ', 40, 40);
    B('For emergencies.\nเผื่อฉุกเฉิน', 640, 470, 720, 620, {size: 50});
  }],
  ['#FFE7A8', () => {
    rays(500, 640, 'rgba(255,255,255,.55)', .2);
    pavement(820, '#D9CDB4'); patch(500, 960, false);
    cone(150, 1060, .9); cone(850, 1060, .9);
    ribbon(170, 940, 830, 940, .45);
    confetti(500, 700, .55, 120, 3);
    standing(NAN, 330, 1030, .9, {face: 'joy', hands: [[-60, -20], [150, -250]]});
    standing(BEER, 670, 1030, .9, {face: 'joy', hands: [[-150, -250], [60, -20]]});
    scissors(500, 690, 190, -1.57, .15);
    sfx('SNIP!', 500, 190, 150, 1, {rot: -.06});
    sfx('ฉึบ!', 800, 330, 110, 1, {face: HAND, weight: 700, color: K.pinkL, rot: .08});
  }],
  ['#CFEAD6', () => {
    shophouses(660, 380, 3); pavement(660); road(780);
    patch(780, 1010, false); dog(860, 1020, .6, 0, true); zzz(820, 880);
    folk(560, 1080, .9, {cap: '#E07B22', vest: '#FF8A2A', shirt: '#6E7A8A', face: 'puzzled', hands: [[-70, 0], [96, -60]]});
    const [vx, vy] = at(560, 1080, .9, 96, -60); shovel(vx, vy + 40, .8);
    shoots(BEER, 320, 1080, .85);
    readsPhone(NAN, 120, 1120, .8, 'happy');
    B('Logged for the bots:\n1 pothole, closed.\nบอกบอตแล้ว: ปิด 1 หลุม', 330, 200, 160, 560, {size: 48});
    B('ครับ...?', 680, 480, 600, 640, {size: 50, fill: '#FBEFD2'});
  }],
 ]},

// ── 2 ───────────────────────────────────────────────────────────────────
{no: 2, slug: 'air-pump', title: 'Someone to Talk To', titleTh: 'เพื่อนคุย',
 post: 'Beer asks people. NaN asks machines. The air pump at the gas station answered in numbers, and that was enough.\nเบียร์ถามคน แนนถามเครื่อง ตู้เติมลมที่ปั๊มตอบเป็นตัวเลข แค่นั้นก็พอแล้ว',
 panels: [
  ['#BFE6F8', () => {
    suthep(760); pavement(760, '#D9CDB4');
    scooter(NAN, 560, 1120, .62, 0);
    x.strokeStyle = K.ink; x.lineWidth = 5; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(660 + d * 60, 1130); x.lineTo(660 + d * 80, 1140); x.stroke(); }
    readsPhone(NAN, 230, 1110, .95, 'happy');
    B('Soft tyre.\nI\'ll ask the internet.\nยางอ่อน ถามเน็ตดีกว่า', 500, 250, 300, 520, {thought: true, size: 44});
  }],
  ['#F7F2E8', () => {
    gasStation(780);
    folk(640, 1080, .92, {cap: '#C8283C', shirt: '#F5F5F0', face: 'joy', hands: [[-70, 0], [190, -170]]});
    standing(BEER, 330, 1080, .92, {face: 'joy', hands: [[-60, -20], [90, -60]]});
    CAP('Beer asks people.\nเบียร์ถามคน', 40, 180, {fill: '#FFD23F'});
    B('Lung! Where\'s\nthe air?\nลุง! เติมลมตรงไหนคะ', 290, 480, 330, 650, {size: 46});
    B('Right there!\nตรงนั้นเลย!', 790, 300, 680, 640, {size: 46, fill: '#FBEFD2'});
  }],
  ['#FFE0EC', () => {
    focusLines(500, 600, 0, 380);
    x.fillStyle = '#FFE0EC'; x.beginPath(); x.ellipse(500, 640, 420, 480, 0, 0, 6.29); x.fill();
    airPump(690, 1080, 1.05);
    standing(NAN, 320, 1100, .95, {face: 'grin', hands: [[-120, -250], [120, -250]]});
    heart(480, 330, 34); heart(560, 250, 24); heart(420, 230, 18);
    B('It has a SCREEN.\nIt talks in NUMBERS.\nมีจอด้วย! พูดเป็นตัวเลข!', 500, 150, 360, 470, {size: 48});
  }],
  ['#F7F2E8', () => {
    gasStation(760);
    folk(640, 980, .6, {cap: '#C8283C', shirt: '#F5F5F0', face: 'joy', hands: [[-70, 0], [80, -210]]});
    shoots(BEER, 800, 980, .62);
    airPump(400, 1110, 1, '32 ✓');
    standing(NAN, 260, 1120, .9, {face: 'joy', hands: [[150, -150], [130, -280]]});
    heart(150, 520, 30); heart(470, 560, 22); heart(90, 640, 18);
    B('Finally. Someone\nwho gets me.\nในที่สุด มีคนเข้าใจฉัน', 330, 200, 300, 560, {size: 48});
    B('She does this.\nเธอเป็นแบบนี้แหละค่ะ', 730, 430, 800, 640, {size: 40, fill: '#FBEFD2'});
  }],
 ]},

// ── 3 ───────────────────────────────────────────────────────────────────
{no: 3, slug: 'market-day', title: 'Market Day', titleTh: 'วันตลาด',
 post: 'Amulet market. Beer came home with new friends. NaN came home with 105 photos of signs, receipts and opening hours, and the bots were delighted.\nตลาดพระ เบียร์กลับบ้านพร้อมเพื่อนใหม่ แนนกลับบ้านพร้อมรูปป้าย ใบเสร็จ และเวลาเปิด 105 รูป บอตดีใจมาก',
 panels: [
  ['#F2E4C8', () => {
    stall(1150);
    folk(640, 1080, .95, {hair: 'bun', grey: true, shirt: '#7FB5A0', apron: '#F5EEE2', face: 'joy', hands: [[-110, -60], [70, 0]]});
    standing(BEER, 330, 1080, .95, {face: 'joy', hands: [[-60, -20], [170, -80]]});
    B('Auntie! How\'s\nyour grandson?\nป้า! หลานเป็นไงบ้าง', 360, 420, 330, 600, {size: 48});
    CAP('They met ten minutes ago.\nเพิ่งรู้จักกันสิบนาที', 960, 40, {right: true, size: 38});
  }],
  ['#FFF4DE', () => {
    focusLines(640, 560, 0, 330);
    x.fillStyle = '#FFF4DE'; x.beginPath(); x.ellipse(620, 560, 340, 300, 0, 0, 6.29); x.fill();
    handSign(640, 520, 1.05, ['พระเครื่อง', 'เปิด 6–14 น.', 'ทุกวัน']);
    standing(NAN, 240, 1130, .95, {face: 'grin', hands: [[60, -230], [130, -250]]});
    const [px, py] = at(240, 1130, .95, 100, -245); phone(px, py, 1.1, null, .15);
    B('Hand-lettered!\nOPENING HOURS!!\nเขียนมือ! มีเวลาเปิด!!', 600, 940, 330, 760, {size: 46});
  }],
  ['#E4EAF6', () => {
    const shots = [
      (w, h) => { x.fillStyle = '#FFF'; x.fillRect(0, 0, w, h); x.strokeStyle = '#999'; x.lineWidth = 4; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(20, 24 + i * 26); x.lineTo(w - 20 - rnd(i) * 60, 24 + i * 26); x.stroke(); } txt('฿120', w / 2, h - 30, {size: 34}); },
      (w, h) => { x.fillStyle = '#9C6B3E'; x.fillRect(0, 0, w, h); x.fillStyle = '#7A4E2D'; x.fillRect(w * .2, h * .15, w * .6, h * .85); x.fillStyle = GOLD; x.beginPath(); x.arc(w * .7, h * .6, 8, 0, 6.29); x.fill(); },
      (w, h) => { x.fillStyle = '#2C5AA0'; x.fillRect(0, 0, w, h); txt('P', w / 2, h / 2, {size: 120, color: '#FFF'}); },
      (w, h) => { x.fillStyle = '#E3D6BC'; x.fillRect(0, 0, w, h); x.save(); x.translate(w * .2, h * .3); x.scale(.55, .55); x.restore(); dog(w * .62, h * .9, .55, .5, false); },
      (w, h) => { x.fillStyle = '#FFF8E6'; x.fillRect(0, 0, w, h); txt('ข้าวซอย', w / 2, h * .35, {size: 40, color: '#B7243A'}); txt('฿60', w / 2, h * .7, {size: 40, color: '#1E3A8A'}); },
      (w, h) => { x.fillStyle = '#C9E7C1'; x.fillRect(0, 0, w, h); x.fillStyle = GOLD; x.beginPath(); x.roundRect(w * .38, h * .22, w * .24, h * .58, [40, 40, 8, 8]); x.fill(); x.strokeStyle = K.ink; x.lineWidth = 4; x.stroke(); },
    ];
    shots.forEach((f, i) => snap(190 + (i % 3) * 310, 250 + Math.floor(i / 3) * 330, 250, 230, (rnd(i + 7) - .5) * .3, f));
    snapsPhone(NAN, 800, 1150, .62, 'grin', -1);
    sfx('CLICK ×105', 380, 900, 104, 1, {rot: -.05});
    sfx('แชะ แชะ แชะ', 370, 1040, 76, 1, {face: HAND, weight: 700, color: K.pinkL, rot: .03});
  }],
  ['#2A2F55', () => {
    x.fillStyle = '#FFE9A8'; x.beginPath(); x.arc(150, 140, 60, 0, 6.29); x.fill();
    x.fillStyle = '#7A4E2D'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.roundRect(-20, 860, 760, 300, 30); x.fill(); x.stroke();
    x.fillStyle = '#A0703F'; x.beginPath(); x.roundRect(-20, 780, 760, 120, 30); x.fill(); x.stroke();
    standing(NAN, 300, 1100, .9, {face: 'joy', hands: [[40, -150], [90, -120]]});
    const [px, py] = at(300, 1100, .9, 70, -140); phone(px, py, 1.1, () => { txt('105', 0, -14, {size: 30, color: '#1E7D4A'}); txt('รูป ✓', 0, 18, {size: 22, color: '#1E7D4A'}); });
    bot(560, 480, 1.05, {hearts: true, arms: true});
    gaichon(860, 1000, .75, true);
    B('ALL FOR ME?!\nให้ผมหมดเลยเหรอ!?', 560, 150, 560, 300, {size: 50});
    B('Every one.\nทุกรูปเลย', 250, 430, 280, 620, {size: 46});
    B('Nice.\nเยี่ยม', 860, 470, 860, 640, {size: 42, fill: '#FBEFD2'});
  }],
 ]},

// ── 4 ───────────────────────────────────────────────────────────────────
{no: 4, slug: 'new-seven', title: 'Grand Opening, Again', titleTh: 'เปิดใหม่อีกแล้ว',
 post: 'A new 7-Eleven opened. Ribbon, hello-welcome, the heating codes photographed for the bots, popsicles on the step.\nเซเว่นเปิดใหม่ ตัดริบบิ้น สวัสดีค่ะยินดีต้อนรับ ถ่ายรหัสอุ่นให้บอต นั่งกินไอติมหน้าร้าน\n\nmotdang.net/sites/wave-at-home',
 panels: [
  ['#1B2347', () => {
    store(860); road(860, '#3E4152');
    x.save(); x.translate(780, 200); x.rotate(.1); x.fillStyle = K.yellow; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath();
    for (let i = 0; i < 20; i++) { const r = i % 2 ? 70 : 110, a = i * Math.PI / 10; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); x.stroke();
    txt('NEW!', 0, -16, {size: 40}); txt('ใหม่', 0, 26, {size: 36}); x.restore();
    speedLines(-20, 900, 320, 5);
    scooter(BEER, 300, 1130, .5, .4, {riding: true, rider: BEER, face: 'joy', streamer: true});
    scooter(NAN, 640, 1150, .5, .4, {riding: true, rider: NAN, face: 'joy', streamer: true});
    B('A NEW SEVEN!!\nเซเว่นเปิดใหม่!!', 360, 190, 560, 600, {size: 56});
  }],
  ['#FFF6C9', () => {
    x.fillStyle = '#FBFBF6'; x.fillRect(0, 0, 1000, PV);
    for (const [c, yy] of [['#F28C28', 0], ['#2E9E5B', 30], ['#D7263D', 60]]) { x.fillStyle = c; x.fillRect(0, 40 + yy, 1000, 30); }
    x.fillStyle = '#FFF6C9'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(160, 200, 680, 960); x.fill(); x.stroke();
    folk(500, 1000, .85, {shirt: '#2E9E5B', face: 'joy', hands: [[-14, -170], [14, -170]]});
    ribbon(120, 820, 880, 820, .45); confetti(500, 600, .5, 90, 8);
    standing(NAN, 190, 1150, .8, {face: 'joy', hands: [[-60, -20], [140, -230]]});
    standing(BEER, 810, 1150, .8, {face: 'joy', hands: [[-140, -230], [60, -20]]});
    const [sx, sy] = at(190, 1150, .8, 140, -230); scissors(sx, sy, 160, -.6, .5);
    sfx('ติ๊งต่อง ♪', 500, 300, 76, 1, {face: HAND, weight: 700, color: K.mint});
    B('สวัสดีค่ะ\nยินดีต้อนรับค่ะ', 500, 470, 500, 620, {size: 46, fill: '#E6F6EC'});
  }],
  ['#FFF6C9', () => {
    x.fillStyle = '#F4F1E8'; x.fillRect(0, 0, 1000, PV);
    x.fillStyle = '#D8DDE6'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(520, 260, 400, 260); x.fill(); x.stroke();
    x.fillStyle = '#2A2F3A'; x.beginPath(); x.rect(550, 290, 240, 200); x.fill(); x.stroke();
    x.fillStyle = '#FFF8E6'; x.beginPath(); x.rect(540, 560, 360, 230); x.fill(); x.stroke();
    ['กด 3', 'กด 5', 'กด 8'].forEach((l, i) => txt(l, 720, 610 + i * 64, {size: 44, color: '#1E3A8A'}));
    snapsPhone(NAN, 800, 1150, .72, 'grin', -1);
    folk(150, 1100, .7, {shirt: '#2E9E5B', face: 'joy', hands: [[-70, 0], [70, -250]]});
    shoots(BEER, 380, 1130, .72);
    B('Heating codes!\nThe bots need these.\nรหัสอุ่น! บอตต้องได้!', 500, 120, 720, 300, {size: 44});
  }],
  ['#1B2347', () => {
    store(760, false);
    x.fillStyle = '#9AA0AE'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(-10, 760, 1020, 90); x.fill(); x.stroke();
    x.fillStyle = '#5C5F6E'; x.fillRect(0, 850, 1000, PV - 850);
    standing(NAN, 330, 1020, .8, {face: 'joy', hands: [[-60, -20], [90, -200]]});
    standing(BEER, 640, 1020, .8, {face: 'happy', hands: [[-80, -190], [60, -20]]});
    const [ax, ay] = at(330, 1020, .8, 90, -200), [bx, by] = at(640, 1020, .8, -80, -190);
    popsicle(ax, ay - 30, .2, K.pink); popsicle(bx, by - 30, -.2, K.mint);
    dog(860, 1080, .6, .6, false);
    B('Our THIRD opening\nthis week!\nงานเปิดที่สามของสัปดาห์!', 340, 180, 330, 500, {size: 44});
    B('It\'s Monday.\nนี่เพิ่งวันจันทร์', 700, 470, 640, 600, {size: 44, fill: '#FBEFD2'});
  }],
 ]},
];
