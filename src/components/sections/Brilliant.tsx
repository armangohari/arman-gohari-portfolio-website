import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import { brilliant } from "@/content/story";
import { cn } from "@/lib/cn";

const PILLAR_ICONS = ["student", "teacher", "institution"] as const;

/**
 * Chapter III. The showcase, in daylight: Aramito, then LeviTutor, then the
 * other stones.
 */
export default function Brilliant() {
  const f = brilliant.feature;
  const s = brilliant.second;
  return (
    <section
      data-tone="light"
      aria-label="The Brilliant"
      className="relative pt-[6svh] pb-[20svh]"
    >
      <div className="shell">
        <Kicker>{brilliant.kicker}</Kicker>
        <h3
          data-split
          className="display mt-8 text-[clamp(2.5rem,6.6vw,5.8rem)]"
        >
          {brilliant.heading}
        </h3>

        <article className="mt-14 grid items-start gap-x-14 gap-y-12 lg:mt-24 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
            <div
              data-tilt
              className="stage-3d relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] shadow-[0_40px_80px_-40px_rgb(60_44_14/0.55)]"
            >
              <div data-parallax="6" className="absolute inset-[-7%]">
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 26rem"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="ring-ink/10 absolute inset-0 rounded-t-[999px] rounded-b-[1.75rem] ring-1 ring-inset"
              />
            </div>
            {/* the gem hangs where the pearl does */}
            <div
              data-gem-slot="brilliant"
              data-morph="1"
              data-polish="0.9"
              data-edge="0.1"
              className="absolute -top-6 -right-2 w-24 sm:w-32 lg:top-[14%] lg:-right-12 lg:w-40"
            />
            <div
              data-rise
              className="glass absolute -bottom-6 left-4 rounded-[1.5rem] px-6 py-4 sm:left-8"
            >
              <p className="display text-[2.6rem] leading-none">
                {f.stat.value}
              </p>
              <p className="text-fg-soft mt-1.5 max-w-[11rem] text-[0.78rem] leading-snug">
                {f.stat.label}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p data-reveal className="label text-accent">
              Stone No. 01 — Founder
            </p>
            <h4
              data-split
              className="display mt-5 text-[clamp(4rem,12vw,10rem)] leading-[0.9]"
            >
              {f.name}
            </h4>

            <p
              data-reveal
              className="voice mt-6 text-[clamp(1.5rem,2.9vw,2.3rem)] leading-[1.2]"
            >
              {f.lede}
            </p>
            <p
              data-reveal
              className="text-fg-soft mt-7 max-w-[38rem] text-[1.02rem] leading-[1.75]"
            >
              {f.body}
            </p>
            <p
              data-reveal
              className="border-accent/50 text-fg mt-5 max-w-[38rem] border-l pl-5 text-[1.02rem] leading-[1.75]"
            >
              {f.mine}
            </p>

            <dl data-reveal className="border-line mt-10 border-t">
              {f.meta.map((row) => (
                <div
                  key={row.k}
                  className="border-line grid grid-cols-[6.5rem_1fr] gap-4 border-b py-3.5 text-[0.95rem]"
                >
                  <dt className="label text-fg-faint pt-1">{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>

            <ul data-reveal className="mt-7 flex flex-wrap gap-2">
              {f.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-line text-fg-soft rounded-full border px-3.5 py-1.5 text-[0.75rem] tracking-wide"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <a
              data-reveal
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-primary mt-10 inline-flex h-14 items-center gap-3 rounded-full pr-6 pl-7 text-[0.8rem] font-medium tracking-[0.2em] uppercase"
            >
              Visit aramito.com
              <Icon name="arrowUpRight" size={18} stroke={1.6} />
            </a>
          </div>
        </article>

        {/* the second stone: LeviTutor */}
        <article className="mt-[18svh] grid items-center gap-x-14 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="label text-accent">
              Stone No. 02 — {s.role}
            </p>
            <h4
              data-split
              className="display mt-5 text-[clamp(3.5rem,11vw,9rem)] leading-[0.9]"
            >
              {s.name}
            </h4>
            <p
              data-reveal
              className="voice mt-6 max-w-[34rem] text-[clamp(1.5rem,2.9vw,2.3rem)] leading-[1.2]"
            >
              {s.lede}
            </p>
            <p
              data-reveal
              className="text-fg-soft mt-7 max-w-[38rem] text-[1.02rem] leading-[1.75]"
            >
              {s.body}
            </p>

            <dl data-reveal className="border-line mt-10 border-t">
              {s.meta.map((row) => (
                <div
                  key={row.k}
                  className="border-line grid grid-cols-[6.5rem_1fr] gap-4 border-b py-3.5 text-[0.95rem]"
                >
                  <dt className="label text-fg-faint pt-1">{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>

            <a
              data-reveal
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-primary mt-10 inline-flex h-14 items-center gap-3 rounded-full pr-6 pl-7 text-[0.8rem] font-medium tracking-[0.2em] uppercase"
            >
              Visit levitutor.top
              <Icon name="arrowUpRight" size={18} stroke={1.6} />
            </a>
          </div>

          {/* three facets on glass, with a warm light behind them to bend */}
          <div className="relative lg:col-span-5">
            <div aria-hidden="true" className="facet-glow" />
            <div
              aria-hidden="true"
              className="text-accent relative mb-8 flex flex-col items-center"
            >
              <Icon name="degree" size={76} stroke={0.7} className="levitate" />
              <span className="levitate-shadow mt-3 block h-2 w-20 rounded-[50%]" />
            </div>
            <ul className="stage-3d relative grid gap-4">
              {s.pillars.map((pillar, i) => (
                <li
                  key={pillar.k}
                  data-rise
                  data-rise-order={i}
                  className={cn(
                    "glass flex items-start gap-5 rounded-[1.5rem] p-6",
                    i === 0 && "lg:mr-16",
                    i === 1 && "lg:mx-8",
                    i === 2 && "lg:ml-16",
                  )}
                >
                  <Icon
                    name={PILLAR_ICONS[i]}
                    size={30}
                    stroke={1}
                    className="text-accent mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="label text-accent">{pillar.k}</p>
                    <p className="voice mt-2 text-[1.3rem] leading-[1.25]">
                      {pillar.v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-[16svh]">
          <Kicker>Other stones</Kicker>
          <ul className="border-line mt-8 border-t">
            {brilliant.works.map((work) => {
              const body = (
                <>
                  <span className="label text-fg-faint w-12 shrink-0 pt-2">
                    {work.year}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="work-row__name display block text-[clamp(1.9rem,4.4vw,3.4rem)] transition-colors duration-300">
                      {work.name}
                    </span>
                    <span className="text-fg-soft mt-2 block max-w-[36rem] text-[0.95rem] leading-relaxed">
                      {work.text}
                    </span>
                    <span className="label text-fg-faint mt-3 block">
                      {work.stack}
                    </span>
                  </span>
                  {work.href ? (
                    <Icon
                      name="arrowUpRight"
                      size={26}
                      className="work-row__arrow text-accent mt-2 shrink-0 opacity-60"
                    />
                  ) : null}
                </>
              );
              const cls =
                "work-row flex items-start gap-5 border-b border-line py-7 sm:gap-8 sm:py-9";
              return (
                <li key={work.name} data-reveal>
                  {work.href ? (
                    <a
                      href={work.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
