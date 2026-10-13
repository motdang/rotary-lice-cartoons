#!/bin/zsh
# ./make.sh          → records the live map (clips/), renders the reel, cover, contact sheet, copies to the Desktop folder
# ./make.sh render   → skips the recording and reuses clips/
set -e
cd "${0:A:h}"
DEST="$HOME/Desktop/1 — NEXT UP/doodle map reel"
[[ "$1" == "render" ]] || node record.mjs
node render.mjs
SHEET=(3.4 7.2 10.0 12.8 15.0 20.8 23.0 27.5 31.5 36.7 38.8 42.5)
node render.mjs --stills ${(j:,:)SHEET},42.6
ins=(); for s in $SHEET; do ins+=(-i "out/stills/t-$s.png"); done
ffmpeg -loglevel error -y $ins -filter_complex "xstack=inputs=12:layout=0_0|w0_0|w0+w1_0|w0+w1+w2_0|w0+w1+w2+w3_0|w0+w1+w2+w3+w4_0|0_h0|w0_h0|w0+w1_h0|w0+w1+w2_h0|w0+w1+w2+w3_h0|w0+w1+w2+w3+w4_h0,scale=2160:-1" out/contact-sheet.png
cp out/stills/t-42.6.png out/cover.png
mkdir -p "$DEST"
cp out/doodle-map-reel.mp4 out/cover.png out/contact-sheet.png "$DEST/"
echo "→ $DEST"
