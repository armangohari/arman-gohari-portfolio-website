import { canLens } from "./glassTier";

export {
  canLens,
  GLASS_TIER_ATTR,
  GLASS_TIER_OVERRIDE_KEY,
  GLASS_TIER_SCRIPT,
  type GlassTier,
  glassTier,
} from "./glassTier";

let asked = false;

/**
 * Adds the refraction lens wherever the browser can run one (Chromium), on
 * every device tier. The glass itself is CSS, so this never blocks a paint:
 * the lens code is fetched at idle, and not at all where it cannot run.
 */
export function startLiquidGlass() {
  if (asked || typeof window === "undefined" || !canLens()) return;
  asked = true;
  const load = () => {
    void import("./liquidGlass").then((lens) => lens.startLens());
  };
  if (typeof requestIdleCallback === "function")
    requestIdleCallback(load, { timeout: 2000 });
  else setTimeout(load, 200);
}
