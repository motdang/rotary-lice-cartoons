// The Best Krapow · กะเพราที่ดีที่สุด — strips 5–8, the comic half of motdang.net/sites/best-krapow.
// Loaded after strips.js; pushes onto STRIPS. Same panel space: 1000 wide × PV (≈1156) tall.

// NaN's puff: a soft cloud that follows her head around (running joke, 2026-10-04)
function puff(px, py, s = 1, droop = 0) {
  x.save(); x.translate(px, py + droop * 40); x.scale(s, s);
  const blobs = [[0, 0, 34], [36, -14, 28], [64, 6, 22], [24, 22, 24], [-30, 14, 22]];
  x.fillStyle = 'rgba(214,222,206,.92)'; x.strokeStyle = 'rgba(30,27,46,.45)'; x.lineWidth = 4;
  for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r, 0, 6.29); x.fill(); x.stroke(); }
  x.fillStyle = 'rgba(214,222,206,.92)'; for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r - 4, 0, 6.29); x.fill(); }
  for (const [bx, by, r] of [[90, -30, 10], [108, -52, 7]]) { x.beginPath(); x.arc(bx, by, r, 0, 6.29); x.fill(); x.stroke(); }
  x.restore();
}
// where her puff goes: just above and behind her head (hips at px, ground gy, scale s)
function nanPuff(px, gy, s, droop = 0) { const [hx, hy] = at(px, gy, s, -150, -400); puff(hx, hy, s * .9, droop); }

function wok(px, py, s = 1, o = {}) {                 // wok on a gas ring, flames under, smoke over
  x.save(); x.translate(px, py); x.scale(s, s); x.lineJoin = 'round'; x.lineCap = 'round';
  x.fillStyle = '#3A3F4E'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.roundRect(-150, 40, 300, 150, 14); x.fill(); x.stroke();
  x.fillStyle = '#6C7183'; x.beginPath(); x.roundRect(-120, 70, 70, 40, 8); x.fill(); x.stroke();
  if (o.flame !== false) for (let i = 0; i < 9; i++) {
    const fx = -90 + i * 22, fh = 40 + rnd(i + 3) * 46;
    x.fillStyle = i % 2 ? '#FFB43F' : '#3D8BFF'; x.beginPath(); x.moveTo(fx - 12, 40); x.quadraticCurveTo(fx - 4, 40 - fh * .6, fx, 40 - fh); x.quadraticCurveTo(fx + 6, 40 - fh * .5, fx + 12, 40); x.fill();
  }
  x.fillStyle = '#2B2A33'; x.beginPath(); x.moveTo(-170, -10); x.quadraticCurveTo(0, 90, 170, -10); x.closePath(); x.fill(); x.stroke();
  x.strokeStyle = K.ink; x.lineWidth = 14; x.beginPath(); x.moveTo(170, -10); x.lineTo(250, -40); x.stroke();
  x.strokeStyle = '#8A5A2B'; x.lineWidth = 8; x.stroke();
  if (o.food !== false) {                               // mince + basil jumping
    for (let i = 0; i < 14; i++) { x.fillStyle = '#7A3E26'; x.beginPath(); x.arc(-110 + rnd(i) * 220, -24 - rnd(i + 5) * 60, 9 + rnd(i + 2) * 6, 0, 6.29); x.fill(); }
    for (let i = 0; i < 7; i++) leaf(-90 + rnd(i + 11) * 180, -50 - rnd(i + 17) * 80, .7, rnd(i) * 6);
    for (let i = 0; i < 5; i++) chili(-80 + rnd(i + 23) * 160, -40 - rnd(i + 29) * 70, .6, rnd(i + 31) * 6);
  }
  if (o.smoke !== false) { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 10; for (const d of [-70, 0, 70]) { x.beginPath(); x.moveTo(d, -110); x.bezierCurveTo(d - 30, -170, d + 30, -220, d, -290); x.stroke(); } }
  x.restore();
}
function leaf(px, py, s, rot, c = '#2F8F3A') {          // a holy basil leaf: serrated, a little purple at the stem
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s);
  x.fillStyle = c; x.strokeStyle = K.ink; x.lineWidth = 3; x.beginPath(); x.moveTo(-26, 0);
  for (let i = 0; i <= 10; i++) { const t = i / 10, xx = -26 + t * 52, w = Math.sin(t * Math.PI) * 16 + (i % 2 ? 2 : 0); x.lineTo(xx, -w); }
  for (let i = 10; i >= 0; i--) { const t = i / 10, xx = -26 + t * 52, w = Math.sin(t * Math.PI) * 16 + (i % 2 ? 2 : 0); x.lineTo(xx, w); }
  x.fill(); x.stroke(); x.strokeStyle = '#7A3E6E'; x.lineWidth = 3; x.beginPath(); x.moveTo(-34, 0); x.lineTo(20, 0); x.stroke(); x.restore();
}
function chili(px, py, s, rot) {
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s);
  x.fillStyle = '#E8202E'; x.strokeStyle = K.ink; x.lineWidth = 3; x.beginPath(); x.moveTo(-24, -5); x.quadraticCurveTo(10, -10, 26, 4); x.quadraticCurveTo(6, 6, -24, 5); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = '#2F8F3A'; x.beginPath(); x.arc(-26, 0, 6, 0, 6.29); x.fill(); x.restore();
}
function krapowPlate(px, py, s = 1, glow = false) {    // rice, the stir-fry, a fried egg with a runny yolk
  x.save(); x.translate(px, py); x.scale(s, s); x.lineJoin = 'round';
  if (glow) { rays(0, -20, 'rgba(255,230,120,.5)', .3, 16); }
  x.fillStyle = '#FFF'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 20, 230, 80, 0, 0, 6.29); x.fill(); x.stroke();
  x.strokeStyle = '#3D8BFF'; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 20, 205, 66, 0, 0, 6.29); x.stroke();
  x.fillStyle = '#FBF7EC'; x.beginPath(); x.ellipse(-50, 0, 120, 52, 0, 0, 6.29); x.fill(); x.lineWidth = 4; x.strokeStyle = K.ink; x.stroke();
  for (let i = 0; i < 26; i++) { x.fillStyle = '#7A3E26'; x.beginPath(); x.arc(20 + rnd(i) * 150, -6 + rnd(i + 9) * 50, 8 + rnd(i + 4) * 6, 0, 6.29); x.fill(); }
  for (let i = 0; i < 8; i++) leaf(40 + rnd(i + 40) * 130, -4 + rnd(i + 50) * 46, .6, rnd(i + 60) * 6);
  for (let i = 0; i < 4; i++) chili(50 + rnd(i + 70) * 120, rnd(i + 80) * 40, .5, rnd(i + 90) * 6);
  x.fillStyle = '#FFF'; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath();         // the egg, frilly brown edge
  for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283, r = 70 + rnd(i + 100) * 12; x.lineTo(-80 + Math.cos(a) * r, -40 + Math.sin(a) * r * .6); }
  x.closePath(); x.fill(); x.strokeStyle = '#B9772E'; x.lineWidth = 7; x.stroke();
  x.fillStyle = '#FFB20F'; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.ellipse(-76, -46, 28, 22, 0, 0, 6.29); x.fill(); x.stroke();
  x.fillStyle = 'rgba(255,255,255,.7)'; x.beginPath(); x.ellipse(-84, -54, 9, 6, 0, 0, 6.29); x.fill();
  x.restore();
}
function stool(px, gy, s = 1, c = '#E23B3B') {          // the red plastic stool
  x.save(); x.translate(px, gy); x.scale(s, s); x.fillStyle = c; x.strokeStyle = K.ink; x.lineWidth = 5; x.lineJoin = 'round';
  x.beginPath(); x.moveTo(-50, -110); x.lineTo(50, -110); x.lineTo(64, 0); x.lineTo(40, 0); x.lineTo(30, -60); x.lineTo(-30, -60); x.lineTo(-40, 0); x.lineTo(-64, 0); x.closePath(); x.fill(); x.stroke();
  x.beginPath(); x.ellipse(0, -112, 58, 16, 0, 0, 6.29); x.fill(); x.stroke(); x.restore();
}
function tamarind(px, gy, s = 1) {                      // the tree the shop is under; the shop's only address
  x.save(); x.translate(px, gy); x.scale(s, s); x.strokeStyle = K.ink; x.lineWidth = 6;
  x.fillStyle = '#7A5230'; x.beginPath(); x.moveTo(-40, 0); x.quadraticCurveTo(-20, -200, -60, -360); x.lineTo(30, -360); x.quadraticCurveTo(10, -200, 40, 0); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = '#5E9E4E'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(-260 + i * 64, -420 - Math.sin(i * .7) * 80, 110, 0, 6.29); x.fill(); x.stroke(); }
  x.fillStyle = '#5E9E4E'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(-260 + i * 64, -420 - Math.sin(i * .7) * 80, 102, 0, 6.29); x.fill(); }
  x.fillStyle = '#8A5A2B'; for (let i = 0; i < 12; i++) { x.save(); x.translate(-240 + rnd(i) * 480, -360 - rnd(i + 3) * 160); x.rotate(.3); x.beginPath(); x.roundRect(-6, 0, 12, 46, 6); x.fill(); x.restore(); }
  x.restore();
}
function helmet(px, py, s, c) { x.save(); x.translate(px, py); x.scale(s, s); x.fillStyle = c; x.strokeStyle = K.ink; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 40, Math.PI, 0); x.lineTo(46, 8); x.lineTo(-40, 8); x.closePath(); x.fill(); x.stroke(); x.fillStyle = 'rgba(40,40,60,.7)'; x.beginPath(); x.ellipse(18, -10, 18, 12, 0, 0, 6.29); x.fill(); x.restore(); }
function bigPhone(px, py, w, h, draw) {                // a phone held up so close it fills the panel
  x.save(); x.translate(px, py);
  x.fillStyle = K.ink; x.beginPath(); x.roundRect(-w / 2 - 24, -h / 2 - 40, w + 48, h + 80, 44); x.fill();
  x.fillStyle = '#FBFBF6'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 18); x.fill();
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); x.translate(-w / 2, -h / 2); draw(w, h); x.restore();
  x.restore();
}
function result(px, py, w, title, sub, o = {}) {       // one search result row
  x.fillStyle = o.bg || '#FFF'; x.strokeStyle = '#C9CED8'; x.lineWidth = 3; x.beginPath(); x.roundRect(px, py, w, 112, 14); x.fill(); x.stroke();
  txt(title, px + 24, py + 36, {size: 34, align: 'left', color: o.color || '#1E3A8A'});
  txt(sub, px + 24, py + 80, {size: 27, align: 'left', color: '#5A6070', weight: 500});
}
function kanban(px, py, s, cols) {                      // Beer's clipboard board: columns of sticky notes
  x.save(); x.translate(px, py); x.scale(s, s); x.rotate(-.04);
  x.fillStyle = '#8A5A2B'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.roundRect(-200, -160, 400, 330, 16); x.fill(); x.stroke();
  x.fillStyle = '#FFF8E6'; x.beginPath(); x.rect(-182, -140, 364, 292); x.fill();
  cols.forEach(([head, notes], i) => {
    const cx = -121 + i * 121; txt(head, cx, -112, {size: 26, color: K.ink});
    notes.forEach((n, k) => { x.fillStyle = [K.yellow, K.pinkL, K.mint][(i + k) % 3]; x.strokeStyle = K.ink; x.lineWidth = 3; x.beginPath(); x.rect(cx - 50, -86 + k * 74, 100, 62); x.fill(); x.stroke(); txt(n, cx, -55 + k * 74, {size: 22}); });
  });
  x.fillStyle = '#C9CED8'; x.beginPath(); x.roundRect(-50, -178, 100, 34, 8); x.fill(); x.stroke();
  x.restore();
}
function riderVest(px, gy, s, num, o = {}) {           // a motorcycle-taxi rider: orange vest with his number
  folk(px, gy, s, {shirt: '#5D6B82', vest: '#FF7A1A', face: o.face || 'joy', hands: o.hands, cap: o.cap});
  const [vx, vy] = at(px, gy, s, 0, -60);
  x.save(); x.translate(vx, vy); x.scale(s, s); x.fillStyle = '#FF7A1A'; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.roundRect(-46, -50, 92, 70, 10); x.fill(); x.stroke();
  txt(num, 0, -14, {size: 40, color: '#FFF', stroke: 6}); x.restore();
}
function pickup(px, gy, s = 1) {                        // a work pickup with hi-vis crew in the bed
  x.save(); x.translate(px, gy); x.scale(s, s); x.lineJoin = 'round'; x.strokeStyle = K.ink; x.lineWidth = 6;
  for (let i = 0; i < 3; i++) { const cx = -250 + i * 90; folk(cx, -120, .55, {shirt: '#C9F23A', vest: '#FF8A2A', cap: '#FFD23F', face: 'happy'}); }
  x.fillStyle = '#E9EDF2'; x.beginPath(); x.moveTo(-330, -40); x.lineTo(-330, -170); x.lineTo(30, -170); x.lineTo(30, -260); x.lineTo(190, -260); x.lineTo(260, -170); x.lineTo(320, -160); x.lineTo(320, -40); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = '#BFE3F5'; x.beginPath(); x.moveTo(60, -240); x.lineTo(180, -240); x.lineTo(230, -175); x.lineTo(60, -175); x.closePath(); x.fill(); x.stroke();
  wheel(-200, -30, 50, 0); wheel(200, -30, 50, 0);
  x.restore();
}
function noSign(px, py, s) {                            // where the shop's sign would be
  x.save(); x.translate(px, py); x.scale(s, s); x.rotate(.05);
  x.fillStyle = '#FFF8E6'; x.strokeStyle = K.ink; x.lineWidth = 5; x.setLineDash([16, 12]); x.beginPath(); x.rect(-150, -50, 300, 100); x.fill(); x.stroke(); x.setLineDash([]);
  txt('(no sign)', 0, -12, {size: 34, color: '#8A6A4A'}); txt('(ไม่มีป้าย)', 0, 26, {size: 28, color: '#8A6A4A'}); x.restore();
}
function sizzle(px, py, s = 1) { sfx('ฉ่า!', px, py, 90 * s, 1, {face: HAND, weight: 700, color: K.orange, rot: -.08}); }
function auntie(px, gy, s, o = {}) { folk(px, gy, s, {hair: 'bun', grey: true, shirt: o.shirt || '#E9A0B4', apron: '#F5EEE2', face: o.face || 'joy', hands: o.hands || [[-80, -40], [90, -60]]}); }
function cook(px, gy, s, o = {}) {                      // auntie at the wok, ladle up
  auntie(px, gy, s, {face: o.face || 'joy', hands: [[110, -40], [150, -150]], shirt: o.shirt});
  const [lx, ly] = at(px, gy, s, 150, -150);
  x.save(); x.translate(lx, ly); x.rotate(.5); x.strokeStyle = '#9AA0AE'; x.lineWidth = 12 * s; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(150 * s, 120 * s); x.stroke();
  x.fillStyle = '#9AA0AE'; x.beginPath(); x.ellipse(160 * s, 130 * s, 34 * s, 22 * s, .5, 0, 6.29); x.fill(); x.restore();
}

STRIPS.push(
// ── 5 ───────────────────────────────────────────────────────────────────
{no: 5, slug: 'krapow-1-the-query', title: 'The Best Krapow, 1: Search', titleTh: 'กะเพราที่ดีที่สุด ๑: ค้นหา',
 post: 'NaN asked the internet for the best pad krapow in Chiang Mai. The internet answered with a listicle from 2019, a pin in a canal, and a five-star and a one-star review that both say "too spicy". Beer had a better idea.\nแนนถามเน็ตหากะเพราที่ดีที่สุดในเชียงใหม่ เน็ตตอบมาเป็นลิสต์ปี 2019 หมุดกลางคลอง กับรีวิวห้าดาวและหนึ่งดาวที่บ่นว่าเผ็ดไปเหมือนกัน เบียร์มีทางที่ดีกว่า\n\nmotdang.net/sites/best-krapow',
 panels: [
  ['#BFE6F8', () => {
    suthep(780); pavement(780, '#D9CDB4');
    scooter(NAN, 640, 1130, .62, 0);
    readsPhone(NAN, 260, 1110, .95, 'happy');
    nanPuff(260, 1110, .95);
    B('Hungry. I\'ll ask the\ninternet: "best pad\nkrapow chiang mai"\nหิว ถามเน็ตดีกว่า', 520, 250, 330, 560, {thought: true, size: 44});
    CAP('11:31', 960, 1040, {right: true, size: 40});
  }],
  ['#FFE0EC', () => {
    focusLines(500, 580, 0, 360);
    bigPhone(500, 590, 760, 960, (w, h) => {
      x.fillStyle = '#F2F4F8'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#FFF'; x.strokeStyle = '#C9CED8'; x.lineWidth = 3; x.beginPath(); x.roundRect(20, 20, w - 40, 70, 35); x.fill(); x.stroke();
      txt('best pad krapow chiang mai', 50, 55, {size: 30, align: 'left', color: '#333', weight: 500});
      result(20, 110, w - 40, 'TOP 10 BEST KRAPOW!!', 'updated 2019 · 6 of 10 closed');
      result(20, 236, w - 40, '★★★★★ "too spicy"', 'and ★☆☆☆☆ "too spicy"');
      result(20, 362, w - 40, 'Krapow Palace 9000 ◉', 'pin: in the canal · คลอง', {color: '#B7243A'});
      result(20, 488, w - 40, 'ร้านป้า (?) · Open 24 h', 'sold out at 13:10', {});
      result(20, 614, w - 40, '"Hidden gem!!"', '(a mall food court)');
      result(20, 740, w - 40, 'TOP 10 BEST KRAPOW', 'copied from the first one', {color: '#8A8FA3'});
    });
    sfx('SCROLL…', 790, 1100, 78, 1, {rot: -.06});
  }],
  ['#E4EAF6', () => {
    x.fillStyle = '#FFF4DE'; x.beginPath(); x.ellipse(500, 560, 420, 420, 0, 0, 6.29); x.fill();
    standing(NAN, 330, 1110, .95, {face: 'grin', hands: [[60, -160], [130, -230]]});
    nanPuff(330, 1110, .95);
    const [px, py] = at(330, 1110, .95, 140, -250); phone(px + 40, py, 1.6, () => { for (const d of [-1, 1]) { x.fillStyle = K.ink; x.beginPath(); x.arc(d * 12, -14, 5, 0, 6.29); x.fill(); } x.strokeStyle = K.ink; x.lineWidth = 3; x.beginPath(); x.arc(0, 8, 9, Math.PI + .3, -.3); x.stroke(); x.fillStyle = '#6FA8FF'; x.beginPath(); x.ellipse(20, -26, 4, 7, 0, 0, 6.29); x.fill(); }, .12);
    heart(160, 330, 26); heart(110, 420, 16);
    B('Don\'t be shy, little phone.\nYou can tell me.\nไม่ต้องอาย บอกแนนได้นะ', 470, 180, 380, 420, {size: 42});
    B('…top ten?\n…ท็อปเท็น?', 790, 560, 700, 700, {size: 42, fill: '#E6F6EC'});
  }],
  ['#CFEAD6', () => {
    shophouses(660, 380, 2); pavement(660); road(800);
    scooter(BEER, 700, 1120, .8, 0, {rider: BEER, face: 'grin'});
    standing(NAN, 230, 1110, .85, {face: 'shock', hands: [[-80, -40], [80, -40]]});
    nanPuff(230, 1110, .85);
    B('Get on. We follow\nthe hi-vis vests.\nขึ้นมา ตามเสื้อสะท้อนแสงไป', 640, 210, 760, 520, {size: 44});
    B('That\'s not an\nalgorithm!\nนั่นไม่ใช่อัลกอริทึม!', 250, 560, 230, 690, {size: 40});
    B('It is. Older than\nsearch, too.\nใช่สิ เก่ากว่าเสิร์ชอีก', 720, 640, 780, 820, {size: 36, fill: '#FBEFD2'});
  }],
 ]},

// ── 6 ───────────────────────────────────────────────────────────────────
{no: 6, slug: 'krapow-2-parank', title: 'The Best Krapow, 2: PaRank', titleTh: 'กะเพราที่ดีที่สุด ๒: ป้าแรงก์',
 post: 'Search ranks pages by links. Chiang Mai ranks lunch by feet: the work crews at 11:42, the motorcycle-taxi rider who eats there, the helmets parked out front, and how far the chili smoke makes you cough. Beer calls it PaRank.\nเสิร์ชจัดอันดับเว็บด้วยลิงก์ เชียงใหม่จัดอันดับข้าวเที่ยงด้วยเท้า คนงานตอน 11:42 พี่วินที่กินประจำ หมวกกันน็อกหน้าร้าน และระยะที่ควันพริกทำให้ไอ เบียร์เรียกว่าป้าแรงก์\n\nmotdang.net/sites/best-krapow',
 panels: [
  ['#BFE6F8', () => {
    suthep(700, '#A9D49A'); road(700);
    pickup(300, 1000, .85);
    speedLines(520, 860, 760, 4);
    scooter(BEER, 620, 1110, .45, .3, {riding: true, rider: BEER, face: 'joy'});
    scooter(NAN, 860, 1130, .45, .3, {riding: true, rider: NAN, face: 'joy'});
    puff(790, 800, .5);
    CAP('11:42. The crews know.\n11:42 น. คนงานรู้', 40, 40, {size: 42});
    B('Tail them!\nตามไป!', 760, 330, 720, 560, {size: 50});
  }],
  ['#F6EBD6', () => {
    shophouses(700, 420, 4); pavement(700);
    riderVest(700, 1090, .95, '17', {hands: [[-70, 0], [-200, -220]]});
    standing(BEER, 260, 1100, .95, {face: 'joy', hands: [[-60, -20], [150, -100]]});
    B('Phi! Where do\nYOU eat lunch?\nพี่! พี่กินข้าวร้านไหน', 300, 230, 260, 560, {size: 44});
    B('ป้าแดง. Under the\ntamarind. No sign.\nใต้ต้นมะขาม ไม่มีป้าย', 690, 470, 700, 640, {size: 40, fill: '#FBEFD2'});
  }],
  ['#FFF4DE', () => {
    focusLines(330, 560, 0, 360);
    x.fillStyle = '#FFF4DE'; x.beginPath(); x.ellipse(330, 560, 300, 360, 0, 0, 6.29); x.fill();
    kanban(330, 470, 1.05, [['หมวก', ['7']], ['เสื้อสะท้อน', ['4']], ['ตำรวจ', ['1']]]);
    standing(BEER, 330, 1120, .7, {face: 'grin', hands: [[-110, -200], [110, -200]]});
    standing(NAN, 800, 1120, .85, {face: 'joy', hands: [[-120, -250], [120, -250]]});
    nanPuff(800, 1120, .85);
    B('She\'s running\nPageRank on FEET!\nจัดอันดับด้วยเท้า!', 780, 230, 790, 520, {size: 40});
    CAP('7 helmets · 4 hi-vis\n1 cop · 0 listicles', 330, 690, {center: true, size: 30, fill: '#FFF'});
  }],
  ['#D8EFC9', () => {
    tamarind(740, 760, 1.1);
    pavement(760, '#D9CDB4');
    noSign(740, 600, .8);
    wok(600, 900, .7); cook(820, 1080, .76);
    stool(110, 1130, .8); stool(240, 1140, .7, '#2F6FD8');
    folk(110, 1010, .66, {shirt: '#C9F23A', vest: '#FF8A2A', cap: '#FFD23F', face: 'sleep', hands: [[-60, -60], [60, -60]]});
    standing(NAN, 400, 1140, .7, {face: 'shock', hands: [[-40, -120], [40, -120]]});
    nanPuff(400, 1140, .7);
    sfx('แค่ก แค่ก!', 200, 600, 66, 1, {face: HAND, weight: 700, color: K.pinkL, rot: -.05});
    CAP('Chili-smoke cough radius: wide.\nควันพริกฟุ้งจนไอทั้งซอย = ร้านดี', 30, 30, {size: 30});
    B('The AIR is\na review!\nอากาศคือรีวิว!', 330, 360, 400, 760, {size: 40});
  }],
 ]},

// ── 7 ───────────────────────────────────────────────────────────────────
{no: 7, slug: 'krapow-3-the-order', title: 'The Best Krapow, 3: The Order', titleTh: 'กะเพราที่ดีที่สุด ๓: สั่ง',
 post: 'One dish, many settings: minced or sliced or crispy pork, egg runny or hard or omelette, how hot, extra or not, beans or no beans. NaN froze and asked the gas ring for help. Beer ordered in one breath.\nเมนูเดียว ปรับได้เป็นร้อยแบบ หมูสับ หมูชิ้น หมูกรอบ ไข่ดาวไม่สุก สุก ไข่เจียว เผ็ดแค่ไหน พิเศษไหม ใส่ถั่วไหม แนนค้าง เลยหันไปถามเตาแก๊ส เบียร์สั่งจบในลมหายใจเดียว\n\nmotdang.net/sites/best-krapow',
 panels: [
  ['#FFF4DE', () => {
    tamarind(820, 520, .8); pavement(860, '#D9CDB4');
    wok(800, 940, .55, {food: false});
    cook(880, 1120, .72, {face: 'happy'});
    B('เอาอะไรลูก?\nWhat\'ll it be?', 820, 330, 860, 600, {size: 44, fill: '#FBEFD2'});
    standing(NAN, 230, 1120, .72, {face: 'shock', hands: [[-60, -40], [60, -40]]});
    nanPuff(230, 1120, .72);
    // the menu tree over her head
    const opts = [['หมู', 'สับ · ชิ้น · กรอบ'], ['ไข่', 'ดาว · เจียว · ไม่สุก'], ['เผ็ด', 'น้อย · กลาง · ตาย'], ['พิเศษ', 'ใช่ · ไม่'], ['ถั่ว', '?!']];
    opts.forEach(([h, o], i) => { const yy = 120 + i * 120; x.fillStyle = '#FFF'; x.strokeStyle = K.ink; x.lineWidth = 4; x.beginPath(); x.roundRect(30, yy, 380, 96, 16); x.fill(); x.stroke(); txt(h, 90, yy + 48, {size: 34, color: '#B7243A'}); txt(o, 270, yy + 48, {size: 28}); });
  }],
  ['#2A2F55', () => {
    focusLines(500, 700, 0, 300);
    x.fillStyle = '#2A2F55'; x.beginPath(); x.ellipse(500, 700, 330, 330, 0, 0, 6.29); x.fill();
    wok(560, 820, 1.1, {food: false, smoke: false});
    heart(700, 600, 34); heart(780, 520, 22); heart(640, 500, 18);
    standing(NAN, 210, 1140, .8, {face: 'grin', hands: [[150, -150], [140, -260]]});
    nanPuff(210, 1140, .8);
    B('Hello, beautiful.\nHow many burners\nare you running?\nสวัสดีจ้ะคนสวย', 500, 200, 300, 600, {size: 40});
    sfx('ฟู่ว ♥', 780, 980, 80, 1, {face: HAND, weight: 700, color: '#3D8BFF'});
  }],
  ['#FFE7A8', () => {
    rays(500, 520, 'rgba(255,255,255,.5)', .1);
    standing(BEER, 300, 1120, .9, {face: 'grin', hands: [[-60, -20], [150, -230]]});
    auntie(800, 1120, .8, {face: 'joy', hands: [[-80, -230], [80, -230]]});
    B('กะเพราหมูสับ ไข่ดาวไม่สุก\nเผ็ดๆ ไม่ใส่ถั่ว พิเศษ\nราดข้าว ค่ะ!', 470, 210, 330, 470, {size: 44});
    B('ได้เลยลูก!', 800, 540, 800, 680, {size: 46, fill: '#FBEFD2'});
    CAP('One breath. หายใจเดียว', 40, 1040, {size: 34});
  }],
  ['#FFF4DE', () => {
    krapowPlate(500, 760, 1.6, true);
    sfx('BEST!!', 230, 170, 110, 1, {rot: -.08});
    standing(NAN, 130, 1180, .6, {face: 'joy', hands: [[-60, -200], [60, -200]]});
    nanPuff(130, 1180, .6);
    B('Best krapow in\nChiang Mai. LOGGED.\nบันทึก: ที่สุดในเชียงใหม่', 640, 330, 200, 900, {size: 38});
    B('Best for Thursday.\nTuesdays her son cooks.\nเฉพาะวันพฤหัส อังคารลูกชายผัด', 600, 1060, 840, 1160, {size: 34, fill: '#FBEFD2'});
  }],
 ]},

// ── 8 ───────────────────────────────────────────────────────────────────
{no: 8, slug: 'krapow-4-luckiest', title: 'The Best Krapow, 4: Closed', titleTh: 'กะเพราที่ดีที่สุด ๔: ปิด',
 post: 'Back the next day: closed for a nephew\'s ordination. Bad luck, for about four seconds. Her sister cooks next door, and Gai Chon was already eating there.\nกลับไปวันรุ่งขึ้น ปิด ไปงานบวชหลาน โชคร้ายอยู่สี่วินาที พี่สาวป้าผัดอยู่ร้านข้างๆ ไก่ชนนั่งกินอยู่ก่อนแล้ว\n\nmotdang.net/sites/best-krapow',
 panels: [
  ['#D8EFC9', () => {
    tamarind(640, 760, 1.05); pavement(760, '#D9CDB4');
    stool(520, 1020, .8); stool(660, 1040, .7, '#2F6FD8');
    handSign(640, 500, .95, ['ปิด', 'ไปงานบวชหลาน', 'CLOSED: ordination']);
    standing(NAN, 230, 1120, .85, {face: 'shock', hands: [[-80, 40], [80, 40]]});
    nanPuff(230, 1120, .85, 1);
    sfx('NOOO', 640, 800, 96, 1, {rot: .06});
  }],
  ['#F6EBD6', () => {
    shophouses(700, 440, 2); pavement(700);
    auntie(760, 1060, .85, {shirt: '#9BD3C0', face: 'joy', hands: [[-70, 0], [120, -250]]});
    standing(BEER, 330, 1100, .9, {face: 'happy', hands: [[-60, -20], [180, -60]]});
    B('Her big sister\ncooks next door.\nพี่สาวป้าผัดอยู่ข้างๆ', 330, 260, 330, 560, {size: 44});
    B('มาๆ ลูก!', 780, 470, 760, 620, {size: 46, fill: '#FBEFD2'});
  }],
  ['#FFE7A8', () => {
    rays(500, 700, 'rgba(255,255,255,.45)', .2);
    standing(NAN, 260, 1010, 1.0, {face: 'joy', legs: 'none', hands: [[-120, -250], [120, -250]]});
    nanPuff(260, 1010, 1.0);
    gaichon(730, 900, .9, true);
    x.fillStyle = '#B5895A'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.rect(-10, 900, 1020, 300); x.fill(); x.stroke();
    krapowPlate(730, 990, .7); krapowPlate(260, 1010, .62); sparkle(150, 930, 2, 1); sparkle(380, 960, 1.5, 1);
    B('Been here\nsince lunch.\nมาตั้งแต่เที่ยง', 760, 220, 740, 420, {size: 40, fill: '#FBEFD2'});
    sfx('EVEN BETTER', 330, 160, 70, 1, {rot: -.06});
  }],
  ['#2A2F55', () => {
    x.fillStyle = '#FFE9A8'; x.beginPath(); x.arc(860, 140, 60, 0, 6.29); x.fill();
    x.fillStyle = '#7A4E2D'; x.strokeStyle = K.ink; x.lineWidth = 6; x.beginPath(); x.roundRect(-20, 900, 1040, 300, 30); x.fill(); x.stroke();
    standing(NAN, 250, 1120, .85, {face: 'grin', hands: [[40, -150], [90, -130]]});
    nanPuff(250, 1120, .85);
    const [px, py] = at(250, 1120, .85, 70, -140); phone(px, py, 1.15, () => { txt('best =', 0, -26, {size: 15, color: '#1E7D4A'}); txt('who·when', 0, -4, {size: 13, color: '#1E7D4A'}); txt('which ป้า', 0, 16, {size: 13, color: '#1E7D4A'}); txt('which egg', 0, 34, {size: 13, color: '#1E7D4A'}); });
    bot(600, 560, 1, {hearts: true, arms: true});
    standing(BEER, 820, 1120, .78, {face: 'roll', hands: [[-60, -20], [60, -20]]});
    CAP('Chiang Mai, 1296. Search, 1998.\nเชียงใหม่ พ.ศ. 1839 · เสิร์ช พ.ศ. 2541', 40, 30, {size: 32});
    B('Bots! Take notes!\nบอตจดด้วย!', 330, 400, 280, 640, {size: 42});
    B('Told you.\nบอกแล้ว', 820, 700, 820, 800, {size: 38, fill: '#FBEFD2'});
  }],
 ]},
);
