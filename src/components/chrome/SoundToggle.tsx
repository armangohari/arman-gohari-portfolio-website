"use client";

import { useRef, useState } from "react";

/** Optional score. Off until asked for; the file is not fetched before that. */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (on) {
      el.pause();
      setOn(false);
      return;
    }
    el.volume = 0.35;
    el.play().then(
      () => setOn(true),
      () => setOn(false),
    );
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: instrumental score, nothing to caption */}
      <audio
        ref={audio}
        loop
        preload="none"
        src="/assets/audios/corals-under-the-sun.mp3"
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Turn the music off" : "Turn the music on"}
        className="glass flex size-10 shrink-0 items-center justify-center rounded-full"
      >
        <span data-on={on} className="sound-bars flex items-center gap-[3px]">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}
