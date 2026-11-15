import type { Tone } from "@/content/story";

/**
 * A chapter's title card. The section is two screens tall and its only child
 * is sticky, so for one screen of scrolling the card holds still while the
 * backdrop changes behind it, the gem takes centre stage, and the title
 * arrives and then flies past the camera.
 */
export default function Interlude({
  id,
  numeral,
  title,
  line,
  tone,
  gem,
}: {
  id: string;
  numeral: string;
  title: string;
  line: string;
  tone: Tone;
  gem: { morph: number; polish: number; edge?: number; tilt?: number };
}) {
  return (
    <section
      id={id}
      data-interlude
      data-morph={gem.morph}
      data-polish={gem.polish}
      data-edge={gem.edge ?? 0}
      data-tilt={gem.tilt ?? 0.42}
      data-y="0.36"
      aria-labelledby={`${id}-title`}
      className="relative h-[190svh] md:h-[220svh]"
    >
      <div data-tone={tone} className="sticky top-0 h-[100svh] overflow-clip">
        <div
          data-interlude-inner
          className="stage-3d absolute inset-0 text-center"
        >
          <p className="label text-accent absolute inset-x-0 top-[11%]">
            Chapter {numeral}
          </p>
          <h2
            id={`${id}-title`}
            className="display absolute inset-x-0 top-[57%] px-4 text-[clamp(3.4rem,13.5vw,11.5rem)]"
          >
            {title}
          </h2>
          <p className="voice text-fg-soft absolute inset-x-0 top-[calc(57%+clamp(4.4rem,15.5vw,13.4rem))] px-6 text-[clamp(1.15rem,2.2vw,1.7rem)]">
            {line}
          </p>
        </div>
      </div>
    </section>
  );
}
