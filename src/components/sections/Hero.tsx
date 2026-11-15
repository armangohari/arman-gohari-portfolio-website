import { site } from "@/content/story";

/**
 * The flash-forward: the finished gem, before the story rewinds to the rough
 * stone. Composed like a film poster — the gem above, the name beneath it —
 * so the two never share the same space. On scroll the two halves of the
 * name part like a title sequence and the camera pushes through.
 */
export default function Hero() {
  return (
    <header
      id="top"
      data-tone="dark"
      data-hero
      className="relative h-[100svh] min-h-[620px] overflow-clip md:min-h-[660px]"
    >
      <div className="shell relative flex h-full flex-col items-center pt-20 pb-7 md:pt-24 md:pb-9">
        {/* the gem's own stage: nothing else is set inside it */}
        <div className="grid min-h-0 w-full flex-1 grid-cols-1 items-center md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <p
            data-hero-item
            className="label text-fg-faint hidden items-center gap-5 md:flex"
          >
            <span className="whitespace-nowrap">{site.location}</span>
            <span aria-hidden="true" className="bg-line h-px flex-1" />
          </p>
          <div
            data-gem-slot="hero"
            data-morph="1"
            data-polish="1"
            data-tilt="0.5"
            className="mx-auto w-[min(60vw,31svh)] md:w-[min(32vw,43svh)]"
          />
          <p
            data-hero-item
            className="label text-fg-faint hidden items-center gap-5 md:flex"
          >
            <span aria-hidden="true" className="bg-line h-px flex-1" />
            <span className="whitespace-nowrap">Portfolio — MMXXVI</span>
          </p>
        </div>

        <h1
          aria-label={site.name}
          className="stage-3d display pointer-events-none flex w-full flex-col items-center text-[min(24vw,12.5svh)] leading-[0.86] whitespace-nowrap select-none md:flex-row md:justify-center md:gap-[0.26em] md:text-[min(12vw,21svh)]"
        >
          <span data-hero-word="arman" className="block will-change-transform">
            <span data-hero-name aria-hidden="true" className="block">
              ARMAN
            </span>
          </span>
          <span data-hero-word="gohari" className="block will-change-transform">
            <span data-hero-name aria-hidden="true" className="gilt block">
              GOHARI
            </span>
          </span>
        </h1>

        <div className="mt-6 grid w-full items-end gap-5 md:mt-9 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <p
            data-hero-item
            className="voice text-fg mx-auto max-w-[19rem] text-center text-[1.2rem] leading-[1.25] md:mx-0 md:max-w-[22rem] md:text-left md:text-[1.6rem]"
          >
            {site.tagline}
          </p>

          <div
            data-hero-item
            aria-hidden="true"
            className="hidden flex-col items-center gap-3 md:flex"
          >
            <span className="label text-fg-faint">Scroll to begin the cut</span>
            <span className="bg-line relative block h-12 w-px overflow-hidden">
              <span className="scroll-cue bg-accent absolute inset-0" />
            </span>
          </div>

          <ul
            data-hero-item
            className="label text-fg-soft flex flex-col items-center gap-1.5 text-center max-md:tracking-[0.18em] md:items-end md:gap-2 md:text-right"
          >
            {site.roles.map((role) => (
              <li
                key={role}
                className={
                  role.includes("University") ? "text-accent" : undefined
                }
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
