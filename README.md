# Arman Gohari — Portfolio

**armangohari.com** · one page, one story.

A _gohari_ is a jeweller: someone who finds the gem inside a rough stone. The site tells Arman's path as exactly that — a stone being cut.

| Chapter             | What it covers                                      |
| ------------------- | --------------------------------------------------- |
| Prologue            | The name, and who is telling the story              |
| I · The Rough       | Curiosity, interests, a computer-engineering degree |
| II · The Cut        | Arelia AI → Karlancer → Aramito → LeviTutor         |
| III · The Brilliant | Aramito and LeviTutor in depth, and other work      |
| IV · The Polish     | The four Cs, the toolkit, the University of Tehran  |
| V · The Setting     | Contact                                             |

## How it is built

- **Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript 7**
- **The gem** is ~112 triangles drawn by a hand-written WebGL 1 renderer
  (`src/components/stage/gem`). No 3D library. A procedural “studio” is sampled
  in the fragment shader instead of an environment map, and the rough stone and
  the cut stone share one topology so the morph is a single uniform.
- **The stage** (`src/components/stage/Stage.tsx`) flies the gem between empty
  layout boxes marked `data-gem-slot`, so its position at every breakpoint is
  decided by CSS, not by coordinates in code.
- **Liquid glass** (`src/lib/liquid-glass`, `.glass*` in `globals.css`) is ported
  from Aramito: CSS material first, an SVG refraction lens added at idle on
  Chromium, and a device tier (`<html data-glass-tier>`) that drops backdrop
  blur on low-end hardware.
- **Motion** (`src/components/stage/Motion.tsx`) is GSAP ScrollTrigger +
  SplitText, with Lenis for wheel smoothing on desktop only. Every tween moves
  `transform` and `opacity` only. `prefers-reduced-motion` turns all of it off.
- **Icons** are [Hugeicons](https://hugeicons.com) (free set).
- **All copy** lives in `src/content/story.ts`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # Biome
pnpm typecheck  # tsc
pnpm build
```

To preview a device tier on one machine:
`localStorage.setItem("gohar-glass-tier", "low")` (or `mid` / `high`) and reload.

## License

[MIT](./LICENSE)
