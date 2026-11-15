import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import { polish } from "@/content/story";

/** How far through the Master's the calendar is, as of the last build. */
const TERM = { from: Date.UTC(2026, 8, 1), to: Date.UTC(2028, 8, 1) };
const TERM_DONE = Math.min(
  1,
  Math.max(0.04, (Date.now() - TERM.from) / (TERM.to - TERM.from)),
);

/**
 * Chapter IV. Craft: the four Cs, the tools, and the wheel the stone is still
 * on — a Master's at the University of Tehran.
 */
export default function Polish() {
  const u = polish.university;
  return (
    <section
      data-tone="dark"
      aria-label="The Polish"
      className="relative pt-[6svh] pb-[20svh]"
    >
      <div className="shell">
        <Kicker>{polish.kicker}</Kicker>
        <h3
          data-split
          className="display mt-8 max-w-[18ch] text-[clamp(2.5rem,6.6vw,5.8rem)]"
        >
          {polish.heading}
        </h3>
        <p
          data-reveal
          className="voice text-fg-soft mt-6 max-w-[36rem] text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.28]"
        >
          {polish.body}
        </p>

        {/* four panes of glass, with the finished gem turning behind them */}
        <div className="relative mt-16 lg:mt-24">
          <div
            data-gem-slot="polish"
            data-morph="1"
            data-polish="1"
            data-tilt="0.55"
            data-alpha="0.92"
            className="absolute top-1/2 left-1/2 w-[min(62vw,19rem)] -translate-x-1/2 -translate-y-1/2 lg:w-[min(30vw,26rem)]"
          />
          <ul className="stage-3d relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {polish.cs.map((c, i) => (
              <li
                key={c.c}
                data-rise
                data-rise-order={i}
                className="glass glass-deep flex min-h-[15rem] flex-col justify-between rounded-[1.75rem] p-6 sm:min-h-[19rem] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    name={c.icon}
                    size={28}
                    stroke={1}
                    className="text-accent"
                  />
                  <span className="label text-fg-faint">{c.field}</span>
                </div>
                <div>
                  <h4 className="display text-[2.7rem] leading-none sm:text-[3rem]">
                    {c.c}
                  </h4>
                  <p className="text-fg-soft mt-4 text-[0.95rem] leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the tool marquee: two lines of type sliding against each other */}
      <div
        aria-hidden="true"
        className="mt-[14svh] space-y-2 overflow-hidden py-2 sm:space-y-4"
      >
        {polish.marquee.map((row, r) => (
          <p
            key={row[0]}
            data-marquee={r % 2 === 0 ? "-1" : "1"}
            className="display flex w-max gap-[0.55em] text-[clamp(3.2rem,11vw,9.5rem)] leading-[1.05] whitespace-nowrap will-change-transform"
            style={{ marginLeft: r % 2 === 0 ? "-4vw" : "-46vw" }}
          >
            {[...row, ...row].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className={i % 3 === 1 ? "gilt" : "outline-type"}
              >
                {tool}
              </span>
            ))}
          </p>
        ))}
      </div>

      {/* still on the wheel: the University of Tehran */}
      <div className="shell mt-[16svh]">
        <div className="relative">
          <p
            aria-hidden="true"
            className="display outline-type pointer-events-none absolute -top-[0.64em] right-[2%] text-[clamp(5.5rem,23vw,20rem)] leading-none select-none"
          >
            Tehran
          </p>

          <article
            data-rise
            aria-labelledby="university-title"
            className="glass glass-thick glass-deep relative rounded-[2rem] p-7 sm:p-10 lg:rounded-[2.5rem] lg:p-14"
          >
            <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="label text-accent flex items-center gap-3">
                <Icon name="university" size={22} stroke={1.1} />
                {u.kicker}
              </p>
              <p className="label text-fg flex items-center gap-3">
                <span aria-hidden="true" className="pulse-dot" />
                {u.status} · {u.years}
              </p>
            </header>

            <div className="mt-10 grid items-end gap-x-14 gap-y-10 lg:mt-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h4
                  id="university-title"
                  className="display text-[clamp(3.3rem,10.5vw,6.4rem)] leading-[0.9] lg:text-[clamp(5rem,7.4vw,6.8rem)]"
                >
                  <span data-split className="block">
                    {u.name[0]}
                  </span>
                  <span data-split className="gilt block pb-[0.06em]">
                    {u.name[1]}
                  </span>
                </h4>
                <p className="label text-fg-soft mt-7">
                  Faculty of Entrepreneurship
                </p>
              </div>

              <div className="lg:col-span-6">
                <p className="voice text-[clamp(1.45rem,2.5vw,2.05rem)] leading-[1.2]">
                  {u.degree}
                </p>
                <p className="text-fg-soft mt-6 max-w-[34rem] text-[1rem] leading-[1.75]">
                  {u.body}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {u.focus.map((item) => (
                    <li
                      key={item}
                      className="border-line text-fg-soft rounded-full border px-3.5 py-1.5 text-[0.75rem] tracking-wide"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* the two years, and how much of them is behind */}
            <div className="mt-11 lg:mt-14">
              <div className="bg-line relative h-px">
                <span
                  className="bg-accent absolute inset-y-0 left-0"
                  style={{ width: `${(TERM_DONE * 100).toFixed(1)}%` }}
                />
                <span
                  aria-hidden="true"
                  className="bg-accent absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${(TERM_DONE * 100).toFixed(1)}%` }}
                />
              </div>
              <p className="label text-fg-faint mt-4 flex justify-between">
                <span>Sep 2026</span>
                <span>Sep 2028</span>
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="shell mt-[14svh]">
        <div className="grid gap-x-14 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kicker>Grading report</Kicker>
            <dl className="border-line mt-8 border-t">
              {polish.toolkit.map((row) => (
                <div
                  key={row.group}
                  data-reveal
                  className="border-line grid gap-x-6 gap-y-2 border-b py-5 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="label text-accent pt-1.5">{row.group}</dt>
                  <dd className="display flex flex-wrap gap-x-3 gap-y-1 text-[1.55rem] leading-snug sm:text-[1.75rem]">
                    {row.items.map((item, i) => (
                      <span key={item} className="whitespace-nowrap">
                        {item}
                        {i < row.items.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="text-fg-faint ml-3"
                          >
                            ·
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <Kicker>Credentials</Kicker>
            <h4
              data-split
              className="display mt-8 text-[clamp(2.2rem,4.6vw,3.8rem)]"
            >
              {polish.wheel.heading}
            </h4>
            <ol className="border-line mt-9 border-t">
              {polish.wheel.items.map((item) => (
                <li
                  key={item.title}
                  data-reveal
                  className="border-line grid gap-x-6 gap-y-1 border-b py-5 sm:grid-cols-[8rem_1fr_auto]"
                >
                  <span className="label text-fg-faint pt-1.5">
                    {item.years}
                  </span>
                  <span>
                    <span className="text-fg block text-[1.02rem]">
                      {item.title}
                    </span>
                    <span className="text-fg-soft mt-1 block text-[0.9rem]">
                      {item.place}
                    </span>
                  </span>
                  <span className="label text-accent pt-1.5">{item.note}</span>
                </li>
              ))}
            </ol>
            <p data-reveal className="label text-fg-soft mt-7">
              {polish.wheel.languages}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
