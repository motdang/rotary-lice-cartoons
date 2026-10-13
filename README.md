# Lice Can't Swim · เหาว่ายน้ำไม่เป็น

Two NaN & Beer cartoons for the Rotary Club of Chiang Mai International's
Children's Water Safety and Drowning Prevention Program (CWSDPP).

**Producer: Marcus (@myatkaungthant-jpg).** Nan's word, 2026-10-13: Marcus has
broad editorial rights over these films, and the open choices below are his.

**Goal, in Nan's words:** reducing lice incidents and removing stigma so more kids
can learn to swim.

## The problem, in Nan's words

> The public school kids have a lice problem and girls especially can't participate
> in CWSDPP because pool administrators find nits. About 8 kids affected each year.
> I know nits ≠ lice, but try explaining that. We have a multi-stakeholder process
> already in development to address, but there's a stigma and embarrassment and
> trouble "enforcing" medicated shampoo at home.

Rotary is giving out the medicated shampoo for this program.

## The two films

| | Audience | Status |
|---|---|---|
| 1 | Thai 8-year-olds (4th grade) and American donors | storyboard: `storyboards/proposed/1-kids.txt` |
| 2 | Pool administrators | Marcus writes it; starting material: `storyboards/proposed/2-administrators.txt` |

Length: 3–5 minutes each.

Marcus's calls: end card (program name, partners, donor line, ask), shape
(16:9, 9:16 or both), Thai voices or silent with Thai + English cards, where it posts.

## What's here

```
storyboards/proposed/   the two films
storyboards/past/       earlier NaN & Beer work: contact sheets, covers, post text
                        bum gun reel · san klang ribbon reel · dropshipping reel ·
                        doodle map reel · comics 1–8 · robot gossip
characters/             Nan and Beer: the FB avatar scripts and pictures (their looks),
                        CHARACTERS.txt (running jokes), LOOKS.txt
collateral/logos/       Rotary wheel, CMIRC logo (dark + white)
collateral/fonts/       Mali and Sarabun (OFL), Thai + Latin
engine/comics/          the NaN & Beer canvas library behind the comics
engine/reels/           sources of the san klang, dropshipping and doodle map reels
```

The finished reels are on the release **reference-reels**.

## The animation engine

The bum gun reel was made in **[motdang/anidoodle-motdang](https://github.com/motdang/anidoodle-motdang)**
(you have write access). The reel is `src/canvas-core/bumGunReel.ts` with its scenes in
`src/canvas-core/bgr/` — `lib.js` there is the NaN & Beer library from `engine/comics/lib.js`,
ported to draw into any canvas. The repo's `README.txt` has the commands; `npm install`, then
`npm run gate` checks a film.

The comics render with `node render.mjs` in `engine/comics/` (needs Chrome).

Any tool or style is fine. Claude Code with the anidoodle plugin built the earlier reels.

## Nan and Beer

Nan's word, 2026-09-28: they have distinct branded looks that follow them across every
style. See `characters/LOOKS.txt`.
