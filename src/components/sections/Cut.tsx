import Kicker from "@/components/ui/Kicker";
import { cut } from "@/content/story";
import { cn } from "@/lib/cn";

/**
 * How far along the stone is at each strike: more cut, fewer guide lines.
 * The fourth is a second stone, so it starts over — rougher, lines drawn on.
 */
const GEM = [
  { morph: 0.42, polish: 0.25, edge: 0.95 },
  { morph: 0.68, polish: 0.45, edge: 0.7 },
  { morph: 0.94, polish: 0.75, edge: 0.3 },
  { morph: 0.52, polish: 0.3, edge: 1 },
];

/** Chapter II. The path, told as four strikes on the stone. */
export default function Cut() {
  return (
    <section
      data-tone="green"
      aria-label="The Cut"
      className="relative pt-[6svh] pb-[20svh]"
    >
      <div className="shell">
        <Kicker>{cut.kicker}</Kicker>
        <h3
          data-split
          className="display mt-8 max-w-[14ch] text-[clamp(2.5rem,6.6vw,5.8rem)]"
        >
          {cut.heading}
        </h3>
        <p
          data-reveal
          className="voice text-fg-soft mt-6 text-[clamp(1.3rem,2.4vw,1.9rem)]"
        >
          {cut.body}
        </p>

        <ol className="mt-16 space-y-16 lg:mt-28 lg:space-y-32">
          {cut.strikes.map((strike, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={strike.index}
                className="stage-3d grid items-center gap-x-10 gap-y-6 lg:grid-cols-12"
              >
                <div
                  className={cn(
                    "flex items-center gap-5 lg:col-span-5 lg:flex-col lg:gap-8",
                    flip && "lg:order-2",
                  )}
                >
                  <div
                    data-gem-slot={`strike-${strike.index}`}
                    data-morph={GEM[i].morph}
                    data-polish={GEM[i].polish}
                    data-edge={GEM[i].edge}
                    className="w-24 shrink-0 sm:w-32 lg:w-[min(20vw,17rem)]"
                  />
                  <p data-reveal className="lg:text-center">
                    <span className="display text-accent block text-[3.4rem] leading-none lg:text-[5rem]">
                      {strike.index}
                    </span>
                    <span className="label text-fg-soft mt-2 block">
                      {strike.name}
                    </span>
                  </p>
                </div>

                <article
                  data-rise
                  className={cn(
                    "glass glass-thick rounded-[2rem] p-7 sm:p-10 lg:col-span-7",
                    flip && "lg:order-1",
                  )}
                >
                  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h4 className="display text-[clamp(2.2rem,4.6vw,3.8rem)]">
                      {strike.company}
                    </h4>
                    <p className="label text-accent">{strike.period}</p>
                  </header>
                  <p className="text-fg-soft mt-3 text-[0.95rem]">
                    {strike.role}
                    <span className="text-fg-faint mx-3">/</span>
                    {strike.place}
                  </p>
                  <p className="voice mt-6 text-[clamp(1.2rem,1.9vw,1.5rem)] leading-[1.34]">
                    {strike.text}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {strike.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border-line text-fg-soft rounded-full border px-3.5 py-1.5 text-[0.75rem] tracking-wide"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
