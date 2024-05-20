"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => {
      if (isPlaying) {
        setIsPlaying(false);
        audioElement.pause();
      } else {
        setIsPlaying(true);
        audioElement.play();
      }
    };

    // Add event listener for audio play
    document.addEventListener("click", handlePlay);

    return () => {
      // Remove event listener for audio play
      document.removeEventListener("click", handlePlay);
    };
  }, [isPlaying]);

  return (
    <>
      {/* Audio Player Element */}
      <audio ref={audioRef} loop>
        <source
          src="/assets/audios/prologue-evgeny-grinko.mp3"
          type="audio/mp3"
        />
        Your Browser Does Not Support Audio!
      </audio>

      {/* Audio Play Info */}
      <div className="relative">
        <span className="gold-gradient-text font-bold tracking-widest">
          click anywhere to {isPlaying ? "pause" : "play"}
        </span>
        <span
          className={clsx(
            "absolute -right-3 top-0 h-2 w-2 animate-ping rounded-full border-2 border-white bg-primary",
            isPlaying && "hidden",
          )}
        />
      </div>
    </>
  );
}
