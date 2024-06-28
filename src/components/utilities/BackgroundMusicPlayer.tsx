"use client";

import { cn } from "@/utils/helpers";
import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottie.loadAnimation({
        container: lottieRef.current,
        path: "/assets/animations/sound-wave.json",
        renderer: "svg",
        autoplay: false,
        loop: true,
      });
    }
  }, []);

  function handleMusicPlayPause() {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      setIsPlaying(false);
      lottie.pause();
      audioElement.pause();
    } else {
      setIsPlaying(true);
      lottie.play();
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
        className={cn("w-12 xl:w-16", !isPlaying && "animate-pulse")}
        onClick={handleMusicPlayPause}
      >
        <div ref={lottieRef}></div>
      </button>
    </>
  );
}
