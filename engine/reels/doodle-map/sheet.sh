#!/bin/zsh
# sheet.sh out.jpg f1 f2 ... — frames side by side, for a look
out=$1; shift; n=$#
ins=(); for f in "$@"; do ins+=(-i "$f"); done
ffmpeg -loglevel error -y "${ins[@]}" -filter_complex "hstack=$n,scale=$((n*330)):-1" "$out"
