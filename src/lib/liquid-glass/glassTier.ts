/**
 * How much a device can afford — liquid glass and the 3D stage both read it.
 * Decided once, before first paint, by a few bytes inlined in <head>
 * (`GLASS_TIER_SCRIPT`), and written to `<html data-glass-tier>` so the
 * stylesheet alone draws the right material from the first frame.
 *
 *  - `low`  — no backdrop blur at all: a near-solid, lit pane, then the
 *             leanest lens. The gem renders at 1x with no dust.
 *  - `mid`  — frosted glass (one CSS backdrop blur), then a single-pass lens.
 *  - `high` — frosted glass, then the full lens with chromatic dispersion.
 *
 * Unknown devices (Safari, Firefox report no `deviceMemory`) are `mid`, and
 * since they cannot lens they stay frosted.
 */

export type GlassTier = "low" | "mid" | "high";

export const GLASS_TIER_ATTR = "data-glass-tier";

/** `localStorage` key that forces a tier — for checking each material on one machine. */
export const GLASS_TIER_OVERRIDE_KEY = "gohar-glass-tier";

/**
 * Inlined into <head>: runs before the first paint.
 *  low  = data saver, ≤2 GB, or ≤4 GB on ≤4 cores
 *  high = ≥8 GB and ≥8 cores
 * It also turns scroll choreography on (`data-motion`) unless the visitor
 * asked for reduced motion, so nothing is hidden for them or without script.
 */
export const GLASS_TIER_SCRIPT = `(function(){var d=document.documentElement,t="mid",n=navigator,m=n.deviceMemory,c=n.hardwareConcurrency||0,k=n.connection,o;try{o=localStorage.getItem("${GLASS_TIER_OVERRIDE_KEY}")}catch(e){}if(o==="low"||o==="mid"||o==="high")t=o;else if((k&&k.saveData)||m<=2||(m<=4&&c<=4))t="low";else if(m>=8&&c>=8)t="high";d.setAttribute("${GLASS_TIER_ATTR}",t);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-motion","on")})()`;

/** The tier the head script picked (`mid` on the server or if it never ran). */
export function glassTier(): GlassTier {
  if (typeof document === "undefined") return "mid";
  const tier = document.documentElement.getAttribute(GLASS_TIER_ATTR);
  return tier === "low" || tier === "high" ? tier : "mid";
}

/**
 * Whether the browser runs SVG filters as a backdrop filter — Chromium only.
 * Elsewhere `backdrop-filter: url(#…)` is dropped, so the lens is never tried.
 */
export function canLens(): boolean {
  if (typeof navigator === "undefined") return false;
  const brands = (
    navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    }
  ).userAgentData?.brands;
  if (brands?.some((b) => /Chromium|Chrome|Edg/i.test(b.brand))) return true;
  return (
    /Chrome|Chromium|Edg/i.test(navigator.userAgent) &&
    !/Safari/i.test(navigator.userAgent.replace(/Chrome\/[0-9.]+/i, ""))
  );
}
