"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect } from "react";
import { glassTier, startLiquidGlass } from "@/lib/liquid-glass";

/**
 * All of the page's choreography, in one place. Sections only carry data
 * attributes; this reads them and wires the motion:
 *
 *   data-hero / data-hero-name / data-hero-word / data-hero-item  the title sequence
 *   data-interlude                 chapter title cards (scrubbed, sticky)
 *   data-split                     headings: lines rise out of a mask
 *   data-words                     paragraphs: words light up as you read
 *   data-reveal                    anything: fades up once
 *   data-rise                      glass panes: tilt up out of the floor in 3D
 *   data-tilt / data-parallax      framed images: turn and drift
 *   data-marquee                   lines of type that slide with scroll
 *   data-draw                      SVG strokes drawn by scroll
 *
 * Every tween moves `transform` and `opacity` only, so the compositor does
 * the work and a slow phone keeps up. Under reduced motion nothing here
 * runs and nothing is hidden.
 */
/**
 * Gold-leaf type is a gradient clipped to the glyphs, and a clip does not
 * follow children that are moved on their own layers. So once a line is split
 * into pieces, each piece carries the gold instead of the line.
 */
function regild(el: HTMLElement, pieces: Element[]) {
  if (!el.classList.contains("gilt")) return;
  el.classList.remove("gilt");
  el.dataset.gilt = "";
  for (const piece of pieces)
    if (el.contains(piece)) piece.classList.add("gilt");
}

export default function Motion() {
  useEffect(() => {
    startLiquidGlass();
    if (document.documentElement.dataset.motion !== "on") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const lean = glassTier() === "low";
    /** Smoothed scrub where the device has headroom; direct where it does not. */
    const scrub = fine && !lean ? 0.6 : true;

    // Smooth wheel scrolling on desktop; phones keep their native scroll.
    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (fine) {
      lenis = new Lenis({ lerp: 0.11, anchors: true, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    } else {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    const ctx = gsap.context(() => {
      /* ── Title sequence ─────────────────────────────────────────── */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const names = gsap.utils.toArray<HTMLElement>("[data-hero-name]", hero);
        const split = SplitText.create(names, { type: "chars" });
        gsap.set(names, { perspective: 900, visibility: "visible" });
        for (const name of names) regild(name, split.chars);
        const intro = gsap.timeline({ delay: 0.15 });
        intro
          .from(split.chars, {
            yPercent: 85,
            rotateX: -80,
            opacity: 0,
            transformOrigin: "50% 100%",
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.055,
          })
          .to(
            "[data-hero-item]",
            { opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.12 },
            0.7,
          )
          .from(
            "[data-hero-item]",
            { y: 24, duration: 1.4, ease: "expo.out", stagger: 0.12 },
            0.7,
          );

        // On scroll the two halves of the name part and the camera pushes in:
        // sideways like curtains where the name is one line, up and down
        // where it is stacked.
        const oneLine = window.matchMedia("(min-width: 768px)").matches;
        const part = oneLine ? { x: 46, y: 0 } : { x: 16, y: 60 };
        const exit = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub,
          },
        });
        exit
          .to(
            "[data-hero-word='arman']",
            {
              xPercent: -part.x,
              yPercent: -part.y,
              scale: 1.18,
              opacity: 0,
              ease: "power1.in",
            },
            0,
          )
          .to(
            "[data-hero-word='gohari']",
            {
              xPercent: part.x,
              yPercent: part.y,
              scale: 1.18,
              opacity: 0,
              ease: "power1.in",
            },
            0,
          )
          .to(
            hero.querySelector(".shell"),
            { opacity: 0, ease: "power1.in", duration: 0.5 },
            0.25,
          );
      }

      /* ── Chapter title cards ────────────────────────────────────── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-interlude]")) {
        const inner = el.querySelector<HTMLElement>("[data-interlude-inner]");
        if (!inner) continue;
        const kids = Array.from(inner.children);
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub,
            },
          })
          .fromTo(
            kids,
            {
              opacity: 0,
              yPercent: 70,
              rotateX: -70,
              transformPerspective: 900,
              transformOrigin: "50% 100%",
            },
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.2,
          )
          .to(
            inner,
            { scale: 1.45, opacity: 0, duration: 0.22, ease: "power2.in" },
            0.78,
          );
      }

      /* ── Headings: lines out of a mask ──────────────────────────── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-split]")) {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            regild(el, self.lines);
            return gsap.from(self.lines, {
              yPercent: 108,
              duration: 1.25,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      }

      /* ── Paragraphs that light up as you read ───────────────────── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-words]")) {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: el,
                  start: "top 82%",
                  end: "bottom 52%",
                  scrub: true,
                },
              },
            );
          },
        });
      }

      /* ── Fade-ups, batched so neighbours arrive together ────────── */
      gsap.set("[data-reveal]", { y: 26 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.07,
            overwrite: true,
          }),
      });

      /* ── Glass panes rising in 3D ───────────────────────────────── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-rise]")) {
        const order = Number(el.dataset.riseOrder ?? 0);
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
            rotateX: lean ? 0 : 24,
            rotateY: lean ? 0 : (order % 2 ? 1 : -1) * 6,
            scale: 0.94,
            transformPerspective: 1100,
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: `top ${96 - order * 2}%`,
              end: `top ${58 - order * 3}%`,
              scrub,
            },
          },
        );
      }

      /* ── Framed images: a slow turn, and drift inside the frame ─── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-tilt]")) {
        gsap.fromTo(
          el,
          { rotateY: -12, rotateX: 5, transformPerspective: 1200 },
          {
            rotateY: 9,
            rotateX: -3,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          },
        );
      }
      for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
        const amount = Number(el.dataset.parallax) || 6;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      /* ── Marquee ────────────────────────────────────────────────── */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-marquee]")) {
        const dir = Number(el.dataset.marquee) || -1;
        gsap.fromTo(
          el,
          { xPercent: dir < 0 ? 0 : -22 },
          {
            xPercent: dir < 0 ? -22 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          },
        );
      }

      /* ── The ring, drawn as the gem is set ──────────────────────── */
      const strokes = gsap.utils.toArray<SVGGeometryElement>("[data-draw]");
      if (strokes.length) {
        const solid = strokes.filter(
          (s) => !s.getAttribute("stroke-dasharray"),
        );
        const dotted = strokes.filter((s) =>
          s.getAttribute("stroke-dasharray"),
        );
        gsap.set(solid, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(dotted, { opacity: 0 });
        const ring = strokes[0].ownerSVGElement;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ring,
              start: "top 78%",
              end: "top 28%",
              scrub,
            },
          })
          .to(
            solid,
            { strokeDashoffset: 0, ease: "power1.inOut", stagger: 0.06 },
            0,
          )
          .to(dotted, { opacity: 0.3, ease: "none" }, 0.5)
          .fromTo(
            ring,
            { rotate: -50 },
            { rotate: 0, ease: "power2.out", transformOrigin: "50% 50%" },
            0,
          );
      }
    });

    // Type metrics change when the web fonts land; measure again then.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      for (const el of document.querySelectorAll<HTMLElement>("[data-gilt]")) {
        el.classList.add("gilt");
        delete el.dataset.gilt;
      }
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
