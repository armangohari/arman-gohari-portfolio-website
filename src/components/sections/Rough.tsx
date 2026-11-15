import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import { rough } from "@/content/story";

/** Chapter I. The raw material: curiosity in four veins, and a degree. */
export default function Rough() {
  return (
    <section
      data-tone="dark"
      aria-label="The Rough"
      className="relative pt-[6svh] pb-[20svh]"
    >
      <div className="shell">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Kicker>{rough.kicker}</Kicker>
            <h3
              data-split
              className="display mt-8 text-[clamp(2.5rem,6.6vw,5.8rem)]"
            >
              {rough.heading}
            </h3>
          </div>
          <div className="relative lg:col-span-4">
            <div
              data-gem-slot="rough"
              data-morph="0"
              data-polish="0"
              data-tilt="0.3"
              className="mx-auto w-40 sm:w-52 lg:absolute lg:top-2 lg:right-4 lg:w-[min(22vw,19rem)]"
            />
          </div>
        </div>

        <p
          data-words
          className="voice mt-10 max-w-[46rem] text-[clamp(1.45rem,2.9vw,2.4rem)] leading-[1.26] lg:mt-16"
        >
          {rough.body}
        </p>

        <ul
          data-rise
          className="glass mt-16 grid overflow-hidden rounded-[1.75rem] sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
        >
          {rough.veins.map((vein) => (
            <li
              key={vein.title}
              className="border-line flex flex-col gap-6 p-6 max-sm:border-t max-sm:first:border-t-0 sm:p-8 lg:border-l lg:first:border-l-0 sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(n+3)]:border-t"
            >
              <Icon
                name={vein.icon}
                size={30}
                stroke={1}
                className="text-accent"
              />
              <div>
                <h4 className="display text-[1.9rem]">{vein.title}</h4>
                <ul className="text-fg-soft mt-4 space-y-1.5 text-[0.95rem]">
                  {vein.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="text-fg-soft mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem]"
        >
          <Icon name="degree" size={22} className="text-accent" />
          <span className="text-fg">{rough.footnote.label}</span>
          <span>{rough.footnote.place}</span>
          <span className="label text-fg-faint">{rough.footnote.years}</span>
        </p>
      </div>
    </section>
  );
}
