import Icon from "@/components/ui/Icon";
import Kicker from "@/components/ui/Kicker";
import { chapters, setting, site } from "@/content/story";

/**
 * Chapter V. The stone leaves the workshop: contact in daylight, on cream,
 * with the gem set inside a turning seal — then the case it came in, closed,
 * with the name on the lid.
 */
export default function Setting() {
  return (
    <footer className="relative">
      <section
        data-tone="light"
        aria-label="The Setting"
        className="relative pt-[4svh] pb-[13svh]"
      >
        <div className="shell">
          <div className="grid items-center gap-x-12 gap-y-6 lg:grid-cols-12 lg:gap-y-0">
            {/* the gem from above, and the seal that turns around it */}
            <div className="relative mx-auto my-[4.5rem] w-[min(52vw,15rem)] sm:my-24 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:my-28 lg:w-[min(22vw,17.5rem)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="setting-ring absolute inset-[-34%] h-[168%] w-[168%]"
              >
                <circle
                  data-draw
                  cx="100"
                  cy="100"
                  r="64"
                  pathLength="1"
                  strokeWidth="1"
                />
                <circle
                  data-draw
                  cx="100"
                  cy="100"
                  r="97"
                  pathLength="1"
                  strokeWidth="0.5"
                  opacity="0.55"
                />
              </svg>
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="seal absolute inset-[-34%] h-[168%] w-[168%]"
              >
                <defs>
                  <path
                    id="seal-path"
                    d="M100 100 m-80 0 a80 80 0 1 1 160 0 a80 80 0 1 1 -160 0"
                  />
                </defs>
                <text className="seal-type" textLength="498">
                  <textPath href="#seal-path">{setting.seal}</textPath>
                </text>
              </svg>
              <div
                data-gem-slot="setting"
                data-morph="1"
                data-polish="1"
                data-tilt="1.22"
                className="relative mx-auto w-[82%]"
              />
            </div>

            <div className="lg:col-span-12 lg:row-start-1">
              <Kicker>{setting.kicker}</Kicker>
              <h3 className="display mt-8 text-[clamp(2.9rem,8.2vw,5.4rem)] lg:text-[clamp(4.5rem,7vw,6.6rem)]">
                <span data-split className="block">
                  {setting.heading[0]}
                </span>
                <span data-split className="gilt block pb-[0.08em]">
                  {setting.heading[1]}
                </span>
              </h3>
            </div>

            <div className="lg:col-span-6 lg:row-start-2">
              <p
                data-reveal
                className="voice text-fg-soft mt-2 max-w-[36rem] text-[clamp(1.25rem,2.2vw,1.7rem)] leading-[1.32]"
              >
                {setting.body}
              </p>
              <a
                data-reveal
                href={`mailto:${site.email}`}
                className="glass-btn glass-primary mt-10 inline-flex h-16 max-w-full items-center gap-3 rounded-full px-7 text-[0.95rem] font-medium tracking-[0.04em] sm:px-9 sm:text-[1.05rem]"
              >
                <Icon name="mail" size={20} stroke={1.5} />
                {site.email}
              </a>
            </div>
          </div>

          {/* elsewhere: a ruled ledger, not a wall of cards */}
          <ul className="border-line mt-[9svh] grid border-t lg:mt-4 lg:grid-cols-5">
            {setting.links.map((link) => (
              <li
                key={link.id}
                data-reveal
                className="border-line border-b lg:border-l lg:first:border-l-0"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="contact-cell group relative flex items-center gap-5 px-1 py-5 lg:flex-col lg:items-start lg:gap-12 lg:px-6 lg:py-7"
                >
                  <Icon
                    name={link.id}
                    size={26}
                    stroke={1.15}
                    className="text-accent relative shrink-0"
                  />
                  <span className="relative min-w-0 flex-1">
                    <span className="display block text-[1.75rem] leading-none">
                      {link.label}
                    </span>
                    <span className="text-fg-soft mt-2 block text-[0.8rem]">
                      {link.handle}
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    size={20}
                    className="contact-cell__arrow text-accent relative shrink-0 lg:absolute lg:top-7 lg:right-6"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* the case, closed: ink and gold, the name on the lid */}
      <div
        data-tone="dark"
        data-tone-cover="dark"
        className="bg-ink relative -mt-10 overflow-clip rounded-t-[2rem] md:rounded-t-[3rem]"
      >
        <div aria-hidden="true" className="case-glow" />
        <div className="shell relative pt-14 md:pt-20">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Icon name="gem" size={30} stroke={1} className="text-accent" />
              <p className="voice mt-6 max-w-[22rem] text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.14]">
                {setting.motto}
              </p>
            </div>

            <nav aria-label="Chapters" className="md:col-span-3">
              <p className="label text-fg-faint">The story</p>
              <ul className="mt-5 space-y-2.5">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className="text-fg-soft hover:text-accent group flex items-baseline gap-4 text-[0.98rem] transition-colors"
                    >
                      <span className="label text-fg-faint w-5">
                        {chapter.numeral}
                      </span>
                      {chapter.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <p className="label text-fg-faint">Now</p>
              <dl className="mt-5 space-y-2.5">
                {setting.now.map((row) => (
                  <div
                    key={row.v}
                    className="flex items-baseline gap-4 text-[0.98rem]"
                  >
                    <dt className="text-fg-faint w-24 shrink-0 text-[0.85rem]">
                      {row.k}
                    </dt>
                    <dd>
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="border-line label text-fg-faint mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t pt-6 md:mt-20">
            <p>
              © 2026 {site.name} · {site.location}
            </p>
            <a
              href="#top"
              className="hover:text-accent group flex items-center gap-3 transition-colors"
            >
              Back to the rough
              <span className="border-line group-hover:border-accent flex size-10 items-center justify-center rounded-full border transition-colors">
                <Icon name="arrowUp" size={16} stroke={1.5} />
              </span>
            </a>
          </div>
        </div>

        <p
          aria-hidden="true"
          data-reveal
          className="display gilt pointer-events-none mt-10 pb-7 text-center text-[25vw] leading-[0.82] whitespace-nowrap select-none sm:text-[13.2vw] md:mt-14"
        >
          <span className="block sm:inline">ARMAN</span>{" "}
          <span className="block sm:inline">GOHARI</span>
        </p>
      </div>
    </footer>
  );
}
