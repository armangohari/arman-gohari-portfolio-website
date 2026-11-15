"use client";
/**
 * Liquid Glass lens — the refraction layer of the site glass (ported from Aramito).
 *
 * The material itself (tint, frost, specular rim, shadow) is plain CSS in
 * globals.css and needs none of this: it is right on the first paint, on every
 * device. This module is loaded on demand, at idle, wherever the browser can
 * run an SVG filter as a backdrop (Chromium), and adds the one thing CSS
 * cannot: the backdrop bending along the bezel — Snell's law (n = 1.5) over a
 * squircle profile, encoded as an SVG feDisplacementMap. Every device tier
 * gets the bend; the tier (glassTier.ts) only sets how rich the filter is.
 *
 * What keeps it cheap:
 *  - the filter is as small as the device needs: one displacement on `low`
 *    and `mid`, the three-pass colour fringe on `high` alone;
 *  - one small map per shape (the bezel band only, at 1x), shared by every
 *    pane of that shape and freed again when no pane uses it;
 *  - sizes come from the ResizeObserver, so nothing here forces layout;
 *  - a pane that is being resized falls back to CSS frost and gets its lens
 *    once it has settled, instead of a new map every frame;
 *  - all of it runs in idle time, a few milliseconds at a go.
 */

import { canLens, type GlassTier, glassTier } from "./glassTier";

const SVG_NS = "http://www.w3.org/2000/svg";
/** Refractive index of the pane (glass). */
const IOR = 1.5;
/** Colour lift of what shows through (Apple's glass is vivid, not grey). */
const SATURATE = 1.8;
/** …and a little brighter, as if lit from inside the pane. */
const GAIN = 1.07;
const LIFT = 0.02;
/** How far apart red and blue bend, as a fraction of the bend (dispersion). */
const DISPERSION = 0.09;
const PROFILE_SAMPLES = 128;

/** The glass's look: bezel [min px, max px, share of the shorter side], pane thickness, frost under the lens. */
const LOOK = { bezel: [9, 26, 0.4], thick: 1.9, frost: 0.6 } as const;

/**
 * How rich the lens is on each device tier. A live backdrop filter costs by
 * area and by passes, so both shrink with the device:
 *  - `full`: the most pixels a pane may have and still carry the colour fringe
 *    (three displacements instead of one);
 *  - `lite`: the most pixels a pane may have and still be lensed at all — past
 *    that it keeps the CSS material;
 *  - `frost`: whether the backdrop is softened under the lens (a blur pass).
 * On `low` the whole lens is three cheap passes: map, bend, colour.
 */
const LENS_QUALITY: Record<
  GlassTier,
  { full: number; lite: number; frost: boolean }
> = {
  low: { full: 0, lite: 90_000, frost: false },
  mid: { full: 0, lite: 160_000, frost: true },
  high: { full: 120_000, lite: 260_000, frost: true },
};
const quality = () => LENS_QUALITY[glassTier()];
/** Corner radius (px) under which glass is a flat bar with no bezel to bend light. */
const FLAT_RADIUS = 10;
/** Most time one idle slice may spend building maps before the rest wait. */
const BUILD_BUDGET_MS = 4;
/** How long a pane's size must hold still before its lens is (re)built. */
const SETTLE_MS = 160;
/** Unused lenses kept around for shapes that come back (menus, toasts). */
const SPARE_LENSES = 12;

/** Panes that can carry a lens… */
const SELECTOR = ".glass, .glass-navbar";
/** …unless they sit inside another pane, whose backdrop filter leaves them nothing to bend. */
const PANE = ".glass, .glass-bar, .glass-navbar";

interface Shape {
  w: number;
  h: number;
  r: number;
}

/** Squircle bezel: flat on top, rolling off smoothly to the rim (0 = rim, 1 = top). */
const surface = (x: number) => (1 - (1 - x) ** 4) ** 0.25;

/**
 * How far a ray falling straight onto the pane at bezel position `x` lands
 * from where it would without glass, per unit of thickness — Snell's law.
 */
function rayShift(x: number, steepness: number) {
  const d = 0.001;
  const a = Math.max(0, x - d);
  const b = Math.min(1, x + d);
  const slope = ((surface(b) - surface(a)) / (b - a)) * steepness;
  const incidence = Math.atan(slope);
  const refracted = Math.asin(Math.sin(incidence) / IOR);
  return surface(x) * Math.tan(incidence - refracted);
}

let profile: { table: Float32Array; peak: number } | null = null;
/**
 * Normalised shift across the bezel, and its peak per px of bezel. A pane's
 * thickness is a fixed multiple of its bezel, so one table serves every shape.
 */
function shiftProfile() {
  if (!profile) {
    const table = new Float32Array(PROFILE_SAMPLES);
    let peak = 0;
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
      const shift =
        LOOK.thick * rayShift(i / (PROFILE_SAMPLES - 1), LOOK.thick);
      table[i] = shift;
      peak = Math.max(peak, shift);
    }
    if (peak > 0) for (let i = 0; i < PROFILE_SAMPLES; i++) table[i] /= peak;
    profile = { table, peak };
  }
  return profile;
}

/** Bezel width for a shape (px). */
function bezelOf(w: number, h: number) {
  const [lo, hi, share] = LOOK.bezel;
  return Math.min(hi, Math.max(lo, Math.min(w, h) * share));
}

/**
 * Refraction map of a rounded rectangle: red/green encode the x/y ray shifts
 * (128 = no shift). Only the band along the edge is visited, and nothing is
 * allocated per pixel.
 */
function lensMap({ w, h, r }: Shape, bezel: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const image = ctx.createImageData(w, h);
  const data = image.data;
  new Uint32Array(data.buffer).fill(0xff808080);

  const { table } = shiftProfile();
  const toSample = (PROFILE_SAMPLES - 1) / bezel;
  const hw = w / 2;
  const hh = h / 2;
  // Corner centres, relative to the pane's centre.
  const cx = hw - r;
  const cy = hh - r;
  const band = Math.min(
    Math.ceil(bezel + r * 0.3) + 1,
    Math.ceil(Math.min(w, h) / 2),
  );
  const skipTo = w - band;

  for (let y = 0; y < h; y++) {
    const py = y + 0.5 - hh;
    const qy = Math.abs(py) - cy;
    const sy = Math.sign(py);
    const row = y * w * 4;
    const sides = y >= band && y < h - band && skipTo > band;
    for (let x = 0; x < w; x++) {
      if (sides && x === band) x = skipTo;
      const px = x + 0.5 - hw;
      const qx = Math.abs(px) - cx;
      // Distance in from the edge, and the outward normal there.
      let inside: number;
      let nx: number;
      let ny: number;
      if (qx > 0 && qy > 0) {
        const len = Math.sqrt(qx * qx + qy * qy);
        inside = r - len;
        nx = qx / len;
        ny = qy / len;
      } else if (qx > qy) {
        inside = r - qx;
        nx = 1;
        ny = 0;
      } else {
        inside = r - qy;
        nx = 0;
        ny = 1;
      }
      if (inside < 0 || inside >= bezel) continue;
      const m = table[Math.round(inside * toSample)] * 127;
      const i = row + x * 4;
      data[i] = 128 - Math.sign(px) * nx * m;
      data[i + 1] = 128 - sy * ny * m;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

/**
 * The canvas as an image URL, decoded before it resolves. The PNG is encoded
 * off the main thread. `feImage` inside a backdrop filter paints with a blank
 * map if its image is still loading, which shows as a grey pane — so nothing is
 * handed to the filter until it's ready.
 */
function imageUrl(canvas: HTMLCanvasElement | null) {
  return new Promise<string>((resolve) => {
    if (!canvas) return resolve("");
    canvas.toBlob((blob) => {
      if (!blob) return resolve("");
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => resolve(url);
      image.onerror = () => {
        URL.revokeObjectURL(url);
        resolve("");
      };
      image.src = url;
    }, "image/png");
  });
}

let defs: SVGDefsElement | null = null;
function lensDefs() {
  if (!defs?.isConnected) {
    const root = document.createElementNS(SVG_NS, "svg");
    root.setAttribute("aria-hidden", "true");
    root.setAttribute("width", "0");
    root.setAttribute("height", "0");
    root.style.position = "absolute";
    root.style.pointerEvents = "none";
    defs = document.createElementNS(SVG_NS, "defs");
    root.append(defs);
    document.body.append(root);
  }
  return defs;
}

function svgNode(tag: string, attrs: Record<string, string | number>) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attrs))
    el.setAttribute(name, String(value));
  return el;
}

/** Saturation, then gain and lift, as one colour matrix. */
const COLOUR = (() => {
  const s = SATURATE;
  const row = (r: number, g: number, b: number) =>
    [r * GAIN, g * GAIN, b * GAIN, 0, LIFT].map((v) => v.toFixed(4)).join(" ");
  return [
    row(0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s),
    row(0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s),
    row(0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s),
    "0 0 0 1 0",
  ].join("  ");
})();

const ONLY: Record<"R" | "G" | "B", string> = {
  R: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  G: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  B: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
};

let lensId = 0;
/** The lens as an SVG filter: frost, bend (dispersed where the tier allows), colour. */
function lensFilter(shape: Shape, mapUrl: string, scale: number) {
  const { full, frost } = quality();
  const source = frost ? "frost" : "SourceGraphic";
  const filter = svgNode("filter", {
    id: `gohar-glass-lens-${++lensId}`,
    x: 0,
    y: 0,
    width: shape.w,
    height: shape.h,
    filterUnits: "userSpaceOnUse",
    primitiveUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB",
  });
  const nodes: Element[] = [];
  if (frost) {
    nodes.push(
      svgNode("feGaussianBlur", {
        in: "SourceGraphic",
        stdDeviation: LOOK.frost,
        result: "frost",
      }),
    );
  }
  nodes.push(
    svgNode("feImage", {
      href: mapUrl,
      x: 0,
      y: 0,
      width: shape.w,
      height: shape.h,
      preserveAspectRatio: "none",
      result: "map",
    }),
  );
  const displace = (by: number, result: string) =>
    svgNode("feDisplacementMap", {
      in: source,
      in2: "map",
      scale: by.toFixed(2),
      xChannelSelector: "R",
      yChannelSelector: "G",
      result,
    });
  if (shape.w * shape.h <= full) {
    const channels = [
      ["R", 1 - DISPERSION],
      ["G", 1],
      ["B", 1 + DISPERSION],
    ] as const;
    for (const [channel, k] of channels) {
      nodes.push(
        displace(scale * k, `bent${channel}`),
        svgNode("feColorMatrix", {
          in: `bent${channel}`,
          type: "matrix",
          values: ONLY[channel],
          result: `only${channel}`,
        }),
      );
    }
    nodes.push(
      svgNode("feBlend", {
        in: "onlyR",
        in2: "onlyG",
        mode: "screen",
        result: "rg",
      }),
      svgNode("feBlend", {
        in: "rg",
        in2: "onlyB",
        mode: "screen",
        result: "bent",
      }),
    );
  } else {
    nodes.push(displace(scale, "bent"));
  }
  nodes.push(
    svgNode("feColorMatrix", { in: "bent", type: "matrix", values: COLOUR }),
  );
  filter.append(...nodes);
  lensDefs().append(filter);
  return filter;
}

/** One lens per shape, shared by every pane of that shape. */
interface Lens {
  uses: number;
  /** `url(#…)` once the map is decoded, or null if it could not be made. */
  filter: Promise<string | null>;
  drop: () => void;
}

const lenses = new Map<string, Lens>();
/** Shapes no pane uses right now, oldest first. */
const spare = new Set<string>();

function buildLens(shape: Shape): Lens {
  const bezel = bezelOf(shape.w, shape.h);
  let node: Element | null = null;
  let url = "";
  let dropped = false;
  const filter = imageUrl(lensMap(shape, bezel)).then((mapUrl) => {
    if (!mapUrl) return null;
    if (dropped) {
      URL.revokeObjectURL(mapUrl);
      return null;
    }
    url = mapUrl;
    node = lensFilter(shape, mapUrl, bezel * shiftProfile().peak * 2);
    return `url(#${node.id})`;
  });
  return {
    uses: 0,
    filter,
    drop: () => {
      dropped = true;
      node?.remove();
      if (url) URL.revokeObjectURL(url);
    },
  };
}

function acquire(key: string, shape: Shape) {
  let lens = lenses.get(key);
  if (!lens) {
    lens = buildLens(shape);
    lenses.set(key, lens);
  }
  spare.delete(key);
  lens.uses++;
  return lens;
}

function release(key: string) {
  const lens = lenses.get(key);
  if (!lens || --lens.uses > 0) return;
  spare.add(key);
  if (spare.size <= SPARE_LENSES) return;
  for (const oldest of spare) {
    spare.delete(oldest);
    lenses.get(oldest)?.drop();
    lenses.delete(oldest);
    break;
  }
}

const sizeKey = (w: number, h: number) => `${w}x${h}r`;

/** The lens each pane holds, by shape key. */
const held = new WeakMap<HTMLElement, string>();

/** Gives the pane the lens for `shape`, or returns it to CSS frost (`null`). */
function setLens(el: HTMLElement, shape: Shape | null) {
  const key = shape ? sizeKey(shape.w, shape.h) + shape.r : "";
  const prev = held.get(el) ?? "";
  if (key === prev) return;
  if (prev) {
    release(prev);
    held.delete(el);
    el.removeAttribute("data-glass-lens");
    el.style.removeProperty("--glass-lens");
  }
  if (!shape) return;
  held.set(el, key);
  acquire(key, shape).filter.then((filter) => {
    if (!filter || held.get(el) !== key || !el.isConnected) return;
    el.style.setProperty("--glass-lens", filter);
    el.setAttribute("data-glass-lens", "");
  });
}

/** The shape to lens, or null when this pane should keep the CSS material. */
function lensShape(el: HTMLElement, w: number, h: number): Shape | null {
  if (w < 8 || h < 8 || w * h > quality().lite) return null;
  // Thick panes are near-opaque and flat bars have no bezel: no lens to see.
  if (
    el.classList.contains("glass-thick") ||
    el.hasAttribute("data-glass-flat")
  )
    return null;
  if (el.parentElement?.closest(PANE)) return null;
  const radius = getComputedStyle(el).borderTopLeftRadius;
  const value = parseFloat(radius) || 0;
  const px = radius.endsWith("%") ? (value / 100) * Math.min(w, h) : value;
  const r = Math.round(Math.min(px, w / 2, h / 2));
  return r < FLAT_RADIUS ? null : { w, h, r };
}

let fiberKey = "";
/**
 * Whether React has claimed this node. Attributes written before hydration
 * read as a mismatch, so a pane waits for it (briefly: nodes React never
 * owns go ahead after two tries).
 */
function hydrated(el: HTMLElement) {
  if (fiberKey) return fiberKey in el;
  for (const key of Object.keys(el)) {
    if (key.startsWith("__reactFiber$")) {
      fiberKey = key;
      return true;
    }
  }
  return false;
}

const whenIdle = (run: () => void) => {
  if (typeof requestIdleCallback === "function")
    requestIdleCallback(run, { timeout: 120 });
  else setTimeout(run, 32);
};

let started = false;

/** Lenses every glass pane, now and later, where the browser can. */
export function startLens() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (!canLens()) return;
  if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches)
    return;

  interface Job {
    w: number;
    h: number;
    due: number;
    tries: number;
  }
  const queue = new Map<HTMLElement, Job>();
  const tracked = new WeakSet<HTMLElement>();
  let scheduled = false;

  const run = () => {
    scheduled = false;
    const now = performance.now();
    // Read everything first (style), then write, so layout is never thrashed.
    const ready: { el: HTMLElement; job: Job; shape: Shape | null }[] = [];
    for (const [el, job] of queue) {
      if (job.due > now) continue;
      queue.delete(el);
      if (!el.isConnected) continue;
      if (job.tries < 2 && !hydrated(el)) {
        queue.set(el, { ...job, due: now + 150, tries: job.tries + 1 });
        continue;
      }
      ready.push({ el, job, shape: lensShape(el, job.w, job.h) });
    }
    const began = performance.now();
    for (let i = 0; i < ready.length; i++) {
      const { el, job, shape } = ready[i];
      if (i > 0 && performance.now() - began > BUILD_BUDGET_MS) {
        if (!queue.has(el)) queue.set(el, { ...job, due: now });
        continue;
      }
      setLens(el, shape);
    }
    pump();
  };

  const pump = () => {
    if (scheduled || !queue.size) return;
    scheduled = true;
    const now = performance.now();
    let wait = Number.POSITIVE_INFINITY;
    for (const job of queue.values()) wait = Math.min(wait, job.due - now);
    if (wait > 0) setTimeout(() => whenIdle(run), wait);
    else whenIdle(run);
  };

  const resizes = new ResizeObserver((entries) => {
    const now = performance.now();
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (!el.isConnected) {
        resizes.unobserve(el);
        tracked.delete(el);
        queue.delete(el);
        setLens(el, null);
        continue;
      }
      const box = entry.borderBoxSize?.[0];
      const w = Math.round(box ? box.inlineSize : el.offsetWidth);
      const h = Math.round(box ? box.blockSize : el.offsetHeight);
      const lens = held.get(el);
      const waiting = queue.get(el);
      if (lens?.startsWith(sizeKey(w, h)) && !waiting) continue;
      // A lens is cut to its pane: once the size moves, the old one would clip.
      if (lens) setLens(el, null);
      queue.set(el, {
        w,
        h,
        due: lens || waiting ? now + SETTLE_MS : now,
        tries: waiting?.tries ?? 0,
      });
    }
    pump();
  });

  const track = (el: HTMLElement) => {
    if (tracked.has(el)) return;
    tracked.add(el);
    resizes.observe(el);
  };

  const scan = (root: ParentNode) => {
    if (root instanceof HTMLElement && root.matches(SELECTOR)) track(root);
    for (const el of root.querySelectorAll<HTMLElement>(SELECTOR)) track(el);
  };

  scan(document.body);

  // Removed panes need no sweep here: the ResizeObserver reports them at 0×0.
  new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") {
        const el = record.target as HTMLElement;
        if (!tracked.has(el) && el.matches(SELECTOR)) track(el);
        continue;
      }
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) scan(node);
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}
