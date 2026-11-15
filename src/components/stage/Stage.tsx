"use client";

import { useEffect, useRef } from "react";
import { chapters, type Tone } from "@/content/story";
import { glassTier } from "@/lib/liquid-glass";
import { scene } from "@/lib/scene";
import { createGemRenderer, type GemFrame } from "./gem/renderer";

/**
 * The stage sits behind the whole page: the scene's colour, a little gold
 * dust, and the gem — the one character of the story.
 *
 * Nothing here is laid out by hand. Sections place empty boxes
 * (`data-gem-slot`) where the gem should rest, chapter title cards
 * (`data-interlude`) hold it centre-screen, and the stage flies it from one
 * to the next as the page scrolls. All positions are measured on resize, so
 * a frame reads `scrollY` and nothing else.
 */

/** Layers above the base (dark) backdrop: one per chapter whose tone changes. */
const LAYERS = chapters
  .map((c, index) => ({ index, tone: c.tone as Tone }))
  .filter(
    ({ index, tone }) =>
      tone !== (index === 0 ? "dark" : chapters[index - 1].tone),
  );

interface Look {
  morph: number;
  polish: number;
  alpha: number;
  edge: number;
  tilt: number;
}

interface Stop extends Look {
  /** Scroll range over which the gem rests at this stop. */
  from: number;
  to: number;
  fixed: boolean;
  /** Slot: centre in document space. Fixed: fractions of the viewport. */
  cx: number;
  cy: number;
  radius: number;
}

const num = (el: HTMLElement, key: string, fallback: number) => {
  const raw = el.dataset[key];
  const value = raw === undefined ? Number.NaN : Number.parseFloat(raw);
  return Number.isNaN(value) ? fallback : value;
};

const lookOf = (el: HTMLElement): Look => ({
  morph: num(el, "morph", 1),
  polish: num(el, "polish", 0.6),
  alpha: num(el, "alpha", 1),
  edge: num(el, "edge", 0),
  tilt: num(el, "tilt", 0.42),
});

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const halo = haloRef.current;
    if (!canvas || !halo) return;

    const tier = glassTier();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      tier === "high" ? 2 : tier === "mid" ? 1.5 : 1,
    );
    const renderer = createGemRenderer(canvas, {
      dpr,
      dust: calm ? 0 : tier === "high" ? 64 : tier === "mid" ? 32 : 0,
      antialias: tier !== "low",
    });

    // The layout viewport, not the window: the two differ under zoom.
    const root = document.documentElement;
    let vw = root.clientWidth;
    let vh = root.clientHeight;
    let stops: Stop[] = [];
    /** Scroll position at which each chapter's title card takes the screen. */
    let chapterTops: number[] = [];
    /** Solid blocks that scroll over the backdrop and carry their own tone. */
    let covers: { top: number; bottom: number; tone: Tone }[] = [];
    /** How far down the screen the navigation's middle sits, in px. */
    const NAV_LINE = 44;
    let docHeight = 1;
    const progressBar = document.querySelector<HTMLElement>("[data-progress]");

    const measure = () => {
      vw = root.clientWidth;
      vh = root.clientHeight;
      const scrollY = window.scrollY;
      docHeight = Math.max(1, root.scrollHeight - vh);
      renderer?.resize(canvas.clientWidth, canvas.clientHeight);

      const next: Stop[] = [];
      chapterTops = [];
      covers = [];
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-tone-cover]",
      )) {
        const rect = el.getBoundingClientRect();
        covers.push({
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          tone: el.dataset.toneCover as Tone,
        });
      }
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-gem-slot], [data-interlude]",
      )) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        if (el.hasAttribute("data-interlude")) {
          chapterTops.push(top);
          const range = Math.max(0, rect.height - vh);
          next.push({
            ...lookOf(el),
            fixed: true,
            from: top,
            to: top + range - vh * 0.22,
            cx: 0.5,
            cy: num(el, "y", 0.4),
            radius: num(el, "size", 0.17),
          });
        } else {
          if (rect.width < 2) continue;
          const cy = top + rect.height / 2;
          next.push({
            ...lookOf(el),
            fixed: false,
            from: cy - vh * 0.74,
            to: cy - vh * 0.3,
            cx: rect.left + rect.width / 2,
            cy,
            radius: rect.width / 2,
          });
        }
      }
      next.sort((a, b) => a.from - b.from);
      // Leave every hand-over at least a quarter of a screen to happen in.
      const gap = vh * 0.25;
      for (let i = 0; i < next.length - 1; i++) {
        const a = next[i];
        const b = next[i + 1];
        if (b.from - a.to < gap) {
          const mid = (a.to + b.from) / 2;
          a.to = Math.max(a.from, mid - gap / 2);
          b.from = mid + gap / 2;
          if (b.to < b.from) b.to = b.from;
        }
      }
      stops = next;
    };

    // What the gem looks like at a stop, for a given scroll position.
    const target: GemFrame = {
      x: vw / 2,
      y: vh / 2,
      radius: 0,
      morph: 1,
      polish: 1,
      alpha: 0,
      edge: 0,
      rotX: 0.42,
      rotY: 0,
      rotZ: 0,
      tone: 0,
      scroll: 0,
      time: 0,
    };
    const frame: GemFrame = { ...target };
    const write = (
      stop: Stop,
      scroll: number,
      weight: number,
      first: boolean,
    ) => {
      const x = stop.fixed ? stop.cx * vw : stop.cx;
      const y = stop.fixed ? stop.cy * vh : stop.cy - scroll;
      const r = stop.fixed
        ? stop.radius * Math.min(vw * 1.45, vh * 1.2)
        : stop.radius;
      if (first) {
        target.x = x;
        target.y = y;
        target.radius = r;
        target.morph = stop.morph;
        target.polish = stop.polish;
        target.alpha = stop.alpha;
        target.edge = stop.edge;
        target.rotX = stop.tilt;
        return;
      }
      target.x = mix(target.x, x, weight);
      target.y = mix(target.y, y, weight);
      target.radius = mix(target.radius, r, weight);
      target.morph = mix(target.morph, stop.morph, weight);
      target.polish = mix(target.polish, stop.polish, weight);
      target.alpha = mix(target.alpha, stop.alpha, weight);
      target.edge = mix(target.edge, stop.edge, weight);
      target.rotX = mix(target.rotX, stop.tilt, weight);
    };

    const aim = (scroll: number) => {
      if (!stops.length) {
        target.alpha = 0;
        return;
      }
      let i = 0;
      while (i < stops.length - 1 && scroll >= stops[i + 1].from) i++;
      const here = stops[i];
      write(here, scroll, 1, true);
      const after = stops[i + 1];
      if (after) {
        // The gem stays with its slot — off-screen with it, if the section is
        // long — and only takes flight in the last screen before the next stop.
        const lift = Math.max(here.to, after.from - vh * 0.95);
        if (scroll <= lift) return;
        const t = ease(clamp01((scroll - lift) / (after.from - lift)));
        write(after, scroll, t, false);
        // a stone in flight catches the light: lift the facet lines mid-way
        target.edge += Math.sin(t * Math.PI) * 0.12;
      }
    };

    // Backdrops: each layer fades in over its chapter's title card.
    let activeTone: Tone = "dark";
    const layerOpacity: number[] = LAYERS.map(() => -1);
    const paintBackdrops = (scroll: number) => {
      let tone: Tone = "dark";
      let chapter = -1;
      let topOpaque = -1;
      for (let k = 0; k < chapters.length; k++) {
        const top = chapterTops[k];
        if (top !== undefined && scroll >= top - vh * 0.35) chapter = k;
      }
      LAYERS.forEach((layer, n) => {
        const top = chapterTops[layer.index];
        const p = top === undefined ? 0 : clamp01((scroll - top) / (vh * 0.5));
        if (p > 0.5) tone = layer.tone;
        if (p >= 1) topOpaque = n;
        if (layerOpacity[n] !== p) {
          layerOpacity[n] = p;
          const el = layerRefs.current[n];
          if (el) el.style.opacity = p.toFixed(3);
        }
      });
      // Anything under a fully opaque layer is not composited at all.
      LAYERS.forEach((_, n) => {
        const el = layerRefs.current[n];
        if (!el) return;
        const show = layerOpacity[n] > 0 && n >= topOpaque;
        const value = show ? "visible" : "hidden";
        if (el.style.visibility !== value) el.style.visibility = value;
      });
      if (baseRef.current) {
        const value = topOpaque >= 0 ? "hidden" : "visible";
        if (baseRef.current.style.visibility !== value)
          baseRef.current.style.visibility = value;
      }
      if (tone !== activeTone) {
        activeTone = tone;
        halo.dataset.tone = tone;
      }
      // A solid block that scrolls over the backdrop (the footer's case)
      // sets the tone for whatever floats above it — the navigation.
      let chrome: Tone = tone;
      for (const cover of covers) {
        if (scroll + NAV_LINE >= cover.top && scroll + NAV_LINE < cover.bottom)
          chrome = cover.tone;
      }
      scene.set({ tone: chrome, chapter });
    };

    // Pointer: the stone leans a little toward the cursor (fine pointers only).
    let leanX = 0;
    let leanY = 0;
    let pointerX = 0;
    let pointerY = 0;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / vw - 0.5) * 2;
      pointerY = (e.clientY / vh - 0.5) * 2;
    };
    if (fine && !calm)
      window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let spin = 0.6;
    let spinSpeed = 0.25;
    let started = false;
    let haloKey = "";
    /** The gem fades up on arrival rather than popping in with the first frame. */
    let arrival = calm ? 1 : 0;
    let progress = -1;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scroll = window.scrollY;
      const velocity = dt > 0 ? (scroll - lastScroll) / dt / vh : 0;
      lastScroll = scroll;

      paintBackdrops(scroll);
      aim(scroll);

      // Ease toward the target: frame-rate independent, so 30 fps devices
      // get the same motion, just sampled less often.
      const k = calm || !started ? 1 : 1 - Math.exp(-dt * 9);
      const slow = calm || !started ? 1 : 1 - Math.exp(-dt * 5);
      started = true;
      frame.x = mix(frame.x, target.x, k);
      frame.y = mix(frame.y, target.y, k);
      frame.radius = mix(frame.radius, target.radius, k);
      frame.morph = mix(frame.morph, target.morph, slow);
      frame.polish = mix(frame.polish, target.polish, slow);
      frame.alpha = mix(frame.alpha, target.alpha, k);
      frame.edge = mix(frame.edge, target.edge, slow);
      frame.tone = mix(frame.tone, activeTone === "light" ? 1 : 0, slow);

      if (!calm) {
        const wanted = 0.22 + Math.max(-3, Math.min(3, velocity)) * 1.5;
        spinSpeed = mix(spinSpeed, wanted, 1 - Math.exp(-dt * 4));
        spin += spinSpeed * dt;
        leanX = mix(leanX, pointerX, 1 - Math.exp(-dt * 3));
        leanY = mix(leanY, pointerY, 1 - Math.exp(-dt * 3));
      }
      frame.rotX = mix(frame.rotX, target.rotX + leanY * 0.16, slow);
      frame.rotY = spin + leanX * 0.3;
      frame.rotZ = calm ? 0.12 : Math.sin(now * 0.00035) * 0.14;
      frame.scroll = scroll / vh;
      frame.time = calm ? 0 : now / 1000;

      if (arrival < 1) arrival = Math.min(1, arrival + dt / 1.4);
      const shown = frame.alpha;
      frame.alpha = shown * ease(arrival);
      renderer?.render(frame);

      // The halo is a DOM node moved on the compositor: no paint, no layout.
      const haloAlpha =
        frame.alpha * (0.3 + 0.7 * frame.polish) * (0.35 + 0.65 * frame.morph);
      const key = `${frame.x.toFixed(1)}|${frame.y.toFixed(1)}|${frame.radius.toFixed(1)}|${haloAlpha.toFixed(2)}`;
      if (key !== haloKey) {
        haloKey = key;
        halo.style.transform = `translate3d(${frame.x.toFixed(1)}px,${frame.y.toFixed(1)}px,0) scale(${(frame.radius * 0.5).toFixed(2)})`;
        halo.style.opacity = haloAlpha.toFixed(2);
      }

      frame.alpha = shown;

      if (progressBar) {
        const p = Math.round(clamp01(scroll / docHeight) * 1000) / 1000;
        if (p !== progress) {
          progress = p;
          progressBar.style.transform = `scaleX(${p})`;
        }
      }
    };

    measure();
    raf = requestAnimationFrame(tick);

    let pending = 0;
    const remeasure = () => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("resize", remeasure, { passive: true });
    void document.fonts?.ready.then(remeasure);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer?.dispose();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div ref={baseRef} className="backdrop backdrop--dark" />
      {LAYERS.map((layer, n) => (
        <div
          key={layer.index}
          ref={(el) => {
            layerRefs.current[n] = el;
          }}
          className={`backdrop backdrop--${layer.tone}`}
          style={{ opacity: 0, visibility: "hidden" }}
        />
      ))}
      <div className="grain" />
      <div ref={haloRef} className="gem-halo" />
      <canvas ref={canvasRef} className="gem-canvas" />
    </div>
  );
}
