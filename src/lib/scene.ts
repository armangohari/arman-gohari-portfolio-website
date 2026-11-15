import type { Tone } from "@/content/story";

/**
 * What the stage is showing right now. The stage writes it once per change
 * (never per frame); the chrome reads it with `useSyncExternalStore`.
 */
export interface SceneState {
  tone: Tone;
  /** -1 before the first chapter (the prologue), then the chapter index. */
  chapter: number;
}

const initial: SceneState = { tone: "dark", chapter: -1 };
let state: SceneState = initial;
const listeners = new Set<() => void>();

export const scene = {
  get: () => state,
  getServer: () => initial,
  set(next: SceneState) {
    if (next.tone === state.tone && next.chapter === state.chapter) return;
    state = next;
    for (const fn of listeners) fn();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
