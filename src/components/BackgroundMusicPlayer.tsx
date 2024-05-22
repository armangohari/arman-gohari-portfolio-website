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
      <div className="relative flex flex-col items-center justify-center gap-12">
        <span className="gold-gradient-text font-bold tracking-widest">
          volume up / tap anywhere to {isPlaying ? "pause" : "play"}
        </span>
        <span
          className={clsx(
            "h-10 w-10 rounded-full border-2 border-white bg-black",
            isPlaying ? "invisible" : "animate-ping",
          )}
        />
      </div>
    </>
  );
}
