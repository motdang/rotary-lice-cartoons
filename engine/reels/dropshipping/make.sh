#!/bin/zsh
# ./make.sh          → renders the dropshipping reel, cover and contact sheet, copies them to the Desktop folder
# lib.js and comic.js come from the comics engine two folders up, with the page made reel-tall (1080×1920).
set -e
cd "${0:A:h}"
DEST="$HOME/Desktop/1 — NEXT UP/dropshipping reel"
sed 's/^const W = 1080, H = 1350,/const W = 1080, H = 1920,/' ../../lib.js > lib.gen.js
cp ../../comic.js comic.gen.js
node render.mjs
SHEET=(1.6 3.4 6.4 8.4 11.5 13.8 17.5 20.2 23.5 26.0 29.0 34.0)
node render.mjs --stills ${(j:,:)SHEET},35.4
ins=(); for s in $SHEET; do ins+=(-i "out/stills/$s.png"); done
ffmpeg -loglevel error -y $ins -filter_complex "xstack=inputs=12:layout=0_0|w0_0|w0+w1_0|w0+w1+w2_0|w0+w1+w2+w3_0|w0+w1+w2+w3+w4_0|0_h0|w0_h0|w0+w1_h0|w0+w1+w2_h0|w0+w1+w2+w3_h0|w0+w1+w2+w3+w4_h0,scale=2160:-1" out/contact-sheet.png
cp out/stills/35.4.png out/cover.png
mkdir -p "$DEST"
cp out/dropshipping-reel.mp4 out/cover.png out/contact-sheet.png "$DEST/"
echo "→ $DEST"
