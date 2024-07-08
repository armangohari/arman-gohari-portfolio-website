"use client";

import { cn } from "@/utils/helpers";
import { useRef, useState } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  function handleMusicPlayPause() {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    if (isPlaying) {
      setIsPlaying(false);
      audioElement.pause();
    } else {
      setIsPlaying(true);
      audioElement.play();
    }
  }

  return (
    <>
      {/* Audio Player Element */}
      <audio ref={audioRef} loop>
        <source
          src="/assets/audios/corals-under-the-sun.mp3"
          type="audio/mp3"
        />
      </audio>

      {/* Play/Pause Button */}
      <button
        className={cn(
          "flex h-12 w-12 items-center justify-center gap-1 xl:scale-125",
          "*:h-1 *:w-1 *:rounded-[1px] *:bg-smooth-white",
          !isPlaying && "animate-pulse",
        )}
        onClick={handleMusicPlayPause}
      >
        {/* Audio Wave Particles */}
        <span
          className={
            isPlaying ? "animate-expand-1-active" : "animate-expand-1-inactive"
          }
        />
        <span
          className={
            isPlaying ? "animate-expand-4-active" : "animate-expand-4-inactive"
          }
        />
        <span
          className={
            isPlaying ? "animate-expand-3-active" : "animate-expand-3-inactive"
          }
        />
        <span
          className={
            isPlaying ? "animate-expand-2-active" : "animate-expand-2-inactive"
          }
        />
      </button>
    </>
  );
}
