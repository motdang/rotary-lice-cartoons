"""Gai Chon (ไก่ชน), Michael's avatar, from the 1080px profile picture. Ink outlines, unlike Nan and Beer."""
INK = "#2A221E"; SKIN = "#F2C7A5"; SKIN2 = "#E3A98A"; CAP = "#1E1B1A"; GOLD = "#F2BE3A"
COMB = "#E84A33"; COMB2 = "#F5876F"; STACHE = "#DDB47A"; STACHE2 = "#B88A4E"; BROW = "#C99A5B"
SILVER = "#B8AE9A"; JACKET = "#2A2522"; TEE = "#F5EFE3"

def gai_chon(shades=False, hat=True):
    o = f'stroke="{INK}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"'
    s = []
    # jacket, tee, neck
    s.append(f'<path d="M120 1080 C130 850 250 780 440 760 L640 760 C830 780 950 850 960 1080Z" fill="{JACKET}" {o}/>')
    s.append(f'<path d="M460 700 L460 790 L620 790 L620 700Z" fill="{SKIN}" {o}/>')
    s.append(f'<path d="M462 720 Q540 760 618 720 L618 750 Q540 790 462 750Z" fill="{SKIN2}"/>')
    s.append(f'<path d="M470 792 L540 890 L610 792Z" fill="{TEE}" {o}/>')
    s.append(f'<path d="M440 762 L400 805 L470 870 M640 762 L680 805 L610 870" fill="none" {o}/>')
    s.append(f'<path d="M315 865 C305 950 305 1010 310 1080 M765 865 C775 950 775 1010 770 1080" fill="none" stroke="#443C37" stroke-width="7"/>')
    # gold chain and a Somdej amulet in a gold frame
    s.append(f'<path d="M472 765 C478 850 505 920 540 952 C575 920 602 850 608 765" fill="none" stroke="{INK}" stroke-width="11"/>'
             f'<path d="M472 765 C478 850 505 920 540 952 C575 920 602 850 608 765" fill="none" stroke="{GOLD}" stroke-width="6"/>')
    s.append(f'<rect x="512" y="966" width="56" height="80" rx="6" fill="{GOLD}" {o}/><rect x="522" y="976" width="36" height="60" rx="3" fill="#F5EBD0"/>'
             f'<path d="M540 990 a5 5 0 1 1 0.1 0 M528 1030 Q528 1000 540 996 Q552 1000 552 1030Z" fill="#B09060"/>')
    # ears
    for x in (330, 750):
        s.append(f'<ellipse cx="{x}" cy="445" rx="38" ry="62" fill="{SKIN}" {o}/>')
    # head
    s.append(f'<path d="M352 290 L728 280 C738 420 740 520 700 610 C660 690 600 722 540 722 C480 722 420 690 380 610 C340 520 342 420 352 290Z" fill="{SKIN}" {o}/>')
    for x in (362, 690):
        s.append(f'<path d="M{x} 300 L{x+26} 300 L{x+26} 380 L{x} 380Z" fill="{SILVER}"/>')
    if not hat:
        s.append(f'<path d="M352 300 C350 200 440 158 540 158 C640 158 730 196 728 290 C640 262 440 262 352 300Z" fill="#8A7456" {o}/>')
        s.append(f'<path d="M352 300 C350 200 440 158 540 158 C640 158 730 196 728 290" fill="none" stroke="{SILVER}" stroke-width="6" stroke-dasharray="3 9"/>')
    # comb on top of the cap
    if hat: s.append(f'<path d="M440 175 C430 130 470 120 480 140 C478 100 520 80 545 110 C555 70 600 70 610 110 C630 90 670 100 668 140 C690 140 700 160 690 175Z" fill="{COMB}" {o}/>')
    for d in (() if not hat else ("M478 142 q10 -18 26 -6", "M540 112 q14 -20 32 -6", "M605 110 q18 -14 30 4")):
        s.append(f'<path d="{d}" fill="none" stroke="{COMB2}" stroke-width="9" stroke-linecap="round"/>')
    # garrison cap, gold piping, rooster pin
    if hat: s.append(f'<path d="M356 300 L372 210 C450 180 600 160 700 162 C724 190 734 230 740 266 C620 252 480 266 356 300Z" fill="{CAP}" {o}/>')
    if hat: s.append(f'<path d="M376 218 C450 190 600 172 696 172" fill="none" stroke="{GOLD}" stroke-width="7"/>'
             f'<path d="M366 292 C480 262 620 250 728 258" fill="none" stroke="{GOLD}" stroke-width="7"/>'
             f'<path d="M532 190 L540 262" stroke="#3A3432" stroke-width="6"/>')
    if hat: s.append(f'<circle cx="447" cy="248" r="26" fill="{GOLD}" {o}/><path d="M433 256 q-4 -14 6 -14 q2 -10 12 -6 q8 -6 12 4 q8 2 4 16Z" fill="{COMB}"/>')
    # brows, eyes
    for x in (438, 642):
        s.append(f'<path d="M{x-48} 352 Q{x} 336 {x+48} 350 L{x+46} 372 Q{x} 360 {x-46} 372Z" fill="{BROW}" {o}/>')
        s.append(f'<path d="M{x-42} 420 Q{x} 390 {x+42} 420 Q{x} 440 {x-42} 420Z" fill="#fff" {o}/>')
        s.append(f'<circle cx="{x}" cy="419" r="16" fill="#3E7CC0"/><circle cx="{x}" cy="419" r="8" fill="{INK}"/><circle cx="{x-5}" cy="413" r="4" fill="#fff"/>')
        s.append(f'<path d="M{x-36} 438 Q{x} 452 {x+36} 438" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')
    # nose, cheeks
    s.append(f'<path d="M528 428 C522 470 505 505 512 522 C520 540 548 540 572 522" fill="none" {o}/>')
    s.append(f'<path d="M552 440 L572 520 L550 528Z" fill="{SKIN2}" opacity=".6"/>')
    for x in (430, 650):
        s.append(f'<ellipse cx="{x}" cy="505" rx="40" ry="24" fill="#F0A898" opacity=".8"/>')
    # big open smile
    s.append(f'<path d="M462 585 Q540 600 618 585 Q600 650 540 655 Q480 650 462 585Z" fill="#7A2A28" {o}/>')
    s.append(f'<path d="M480 592 Q540 604 600 592 L596 610 Q540 618 484 610Z" fill="#fff"/>')
    s.append(f'<ellipse cx="540" cy="642" rx="34" ry="10" fill="#E07A70"/>')
    s.append(f'<path d="M526 690 q14 10 28 0" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')
    # handlebar moustache: two fat wings, curled tips
    wing = ('M540 548 C495 522 410 526 340 552 C318 560 300 560 296 552 '
            'C318 590 400 606 470 600 C510 596 532 580 540 566Z')
    curl = 'M336 556 C296 566 272 540 286 512 C298 490 326 498 322 516'
    for t in ("", 'transform="translate(1080 0) scale(-1 1)"'):
        s.append(f'<path d="{curl}" fill="none" stroke="{INK}" stroke-width="30" stroke-linecap="round" {t}/>')
        s.append(f'<path d="{curl}" fill="none" stroke="{STACHE}" stroke-width="16" stroke-linecap="round" {t}/>')
        s.append(f'<path d="{wing}" fill="{STACHE}" {o} {t}/>')
        s.append(f'<path d="M520 560 C470 562 410 566 360 568 M512 575 C470 582 430 586 392 586" fill="none" stroke="{STACHE2}" stroke-width="5" stroke-linecap="round" {t}/>')
    s.append(f'<path d="M540 548 L540 580" {o}/>')
    if shades:  # aviators
        for x, sg in ((438, 1), (642, -1)):
            s.append(f'<path d="M{x-62} 392 L{x+58} 392 C{x+58} 440 {x+40} 470 {x} 470 C{x-40} 470 {x-66} 440 {x-62} 392Z" fill="#3A4A5C" stroke="#C9A24A" stroke-width="8"/>')
            s.append(f'<path d="M{x-44} 404 L{x-10} 404 L{x-34} 440Z" fill="#fff" opacity=".35"/>')
        s.append(f'<path d="M496 398 Q540 386 584 398" fill="none" stroke="#C9A24A" stroke-width="8"/>')
        s.append(f'<path d="M376 396 L340 410 M704 396 L740 410" stroke="#C9A24A" stroke-width="8"/>')
    return "".join(s)

if __name__ == "__main__":
    for name, kw in (("hat", {}), ("shades", {"shades": True}), ("nohat", {"hat": False})):
        open(f"gaichon-{name}.svg", "w").write('<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#C0392F"/>' + gai_chon(**kw) + '</svg>')
