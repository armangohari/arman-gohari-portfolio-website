"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Icon from "@/components/ui/Icon";
import { chapters, site } from "@/content/story";
import { cn } from "@/lib/cn";
import { scene } from "@/lib/scene";
import SoundToggle from "./SoundToggle";

/**
 * The only chrome on the page: one floating pane of liquid glass. It says
 * which chapter is on screen, opens the chapter list, and takes on the tone
 * of whatever scene is behind it.
 */
export default function Nav() {
  const { tone, chapter } = useSyncExternalStore(
    scene.subscribe,
    scene.get,
    scene.getServer,
  );
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && root.current?.contains(e.target as Node))
        return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const current = chapter >= 0 ? chapters[chapter] : null;

  return (
    <nav
      ref={root}
      data-tone={tone}
      aria-label="Chapters"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5"
    >
      <div className="pointer-events-auto relative w-full max-w-[34rem]">
        <div
          data-tone={tone}
          className="glass-navbar text-fg relative flex h-[3.4rem] items-center gap-1.5 overflow-hidden rounded-full pr-2 pl-2 transition-colors duration-500"
        >
          <a
            href="#top"
            aria-label={`${site.name} — back to top`}
            className="glass text-accent flex size-10 shrink-0 items-center justify-center rounded-full"
          >
            <Icon name="gem" size={19} stroke={1.3} />
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="chapter-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-full px-3 text-left"
          >
            <span className="display text-accent w-6 shrink-0 text-center text-[1.15rem]">
              {current ? current.numeral : "·"}
            </span>
            <span className="label truncate">
              {current ? current.title : "Prologue"}
            </span>
            <Icon
              name="arrowDown"
              size={15}
              stroke={1.6}
              className={cn(
                "text-fg-faint ml-auto shrink-0 transition-transform duration-500",
                open && "rotate-180",
              )}
            />
          </button>

          <SoundToggle />

          <a
            href={`mailto:${site.email}`}
            className="glass-btn glass-primary flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-[0.72rem] font-medium tracking-[0.18em] uppercase sm:px-5"
          >
            <Icon name="mail" size={16} stroke={1.6} className="sm:hidden" />
            <span className="hidden sm:inline">Contact</span>
          </a>

          {/* how far through the story you are */}
          <span
            data-progress
            aria-hidden="true"
            className="bg-accent/80 absolute inset-x-6 bottom-0 h-px origin-left scale-x-0"
          />
        </div>

        <div
          id="chapter-menu"
          data-tone={tone}
          inert={!open}
          className={cn(
            "glass glass-thick absolute inset-x-0 top-[calc(100%+0.6rem)] origin-top rounded-[1.75rem] p-2 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0",
          )}
        >
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={i === chapter ? "step" : undefined}
                  className={cn(
                    "hover:bg-fg/5 flex items-center gap-4 rounded-[1.25rem] px-4 py-3 transition-colors duration-300",
                    i === chapter && "bg-fg/[0.06]",
                  )}
                >
                  <span className="display text-accent w-7 text-center text-[1.3rem]">
                    {c.numeral}
                  </span>
                  <span className="flex-1">
                    <span className="display block text-[1.45rem] leading-tight">
                      {c.title}
                    </span>
                    <span className="voice text-fg-soft block text-[0.98rem]">
                      {c.line}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
