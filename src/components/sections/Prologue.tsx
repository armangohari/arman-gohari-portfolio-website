import Image from "next/image";
import Kicker from "@/components/ui/Kicker";
import { prologue } from "@/content/story";

/** The premise: what the name means, and who is telling the story. */
export default function Prologue() {
  const [lead, rest] = prologue.statement;
  return (
    <section
      id="prologue"
      data-tone="dark"
      aria-labelledby="prologue-title"
      className="relative pt-[16svh] pb-[18svh]"
    >
      <div className="shell">
        <Kicker>Prologue</Kicker>

        <div className="mt-8 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              id="prologue-title"
              data-split
              className="display text-[clamp(2.7rem,7.4vw,6.6rem)]"
            >
              {lead}
            </h2>
            <p
              data-words
              className="voice text-fg mt-8 max-w-[34rem] text-[clamp(1.4rem,2.5vw,2.05rem)] leading-[1.28]"
            >
              {rest}
            </p>

            {/* the dictionary, on glass */}
            <dl
              data-rise
              className="glass glass-thick mt-12 max-w-[34rem] rounded-[1.75rem] p-6 sm:p-8"
            >
              {prologue.entries.map((entry, i) => (
                <div
                  key={entry.word}
                  className={
                    i > 0 ? "border-line mt-6 border-t pt-6" : undefined
                  }
                >
                  <dt className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="display text-[2rem] leading-none sm:text-[2.4rem]">
                      {entry.word}
                    </span>
                    <span className="voice text-fg-faint text-base">
                      {entry.kind}
                    </span>
                  </dt>
                  <dd className="text-fg-soft mt-3 space-y-1 text-[0.95rem] leading-relaxed">
                    {entry.senses.map((sense, n) => (
                      <p key={sense} className="flex gap-3">
                        <span className="text-accent">{n + 1}.</span>
                        <span>{sense}</span>
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative mx-auto w-full max-w-[24rem] lg:col-span-5 lg:mt-6 lg:max-w-none">
            {/* the gem drifts down beside the portrait, already losing its polish */}
            <div
              data-gem-slot="prologue"
              data-morph="0.62"
              data-polish="0.35"
              data-edge="0.55"
              className="absolute -top-10 -left-4 z-10 w-28 sm:w-36 lg:top-[52%] lg:-left-16 lg:w-44"
            />
            <div
              data-tilt
              className="stage-3d bg-ink-soft relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem]"
            >
              <div data-parallax="7" className="absolute inset-[-8%]">
                <Image
                  src="/assets/images/arman-gohari.webp"
                  alt="Portrait of Arman Gohari in a dark suit, hands clasped."
                  fill
                  sizes="(min-width: 1024px) 34vw, 24rem"
                  className="portrait object-cover object-[50%_18%]"
                />
              </div>
              <div
                aria-hidden="true"
                className="from-ink/70 ring-gold/30 absolute inset-0 rounded-t-[999px] rounded-b-[1.5rem] bg-gradient-to-t via-transparent to-transparent ring-1 ring-inset"
              />
            </div>
            <figcaption
              data-reveal
              className="label text-fg-faint mt-5 flex items-center justify-between gap-4"
            >
              <span>{prologue.caption}</span>
              <span aria-hidden="true" className="bg-line h-px flex-1" />
              <span>Fig. 0</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
