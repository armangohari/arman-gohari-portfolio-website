"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusicPlayer() {
  // State variable to track whether the music is currently playing.
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Ref object to hold a reference to the HTML audio element.
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Effect hook to handle playing and pausing the music.
   * Adds a click event listener to the document to toggle play/pause.
   * Removes the event listener when the component is unmounted.
   */
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

    // Clean up function to remove event listener
    return () => {
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
        <span className="cyan-gradient-text font-bold tracking-widest">
          volume up / tap anywhere to {isPlaying ? "pause" : "play"}
        </span>
        <span
          className={clsx(
            "h-10 w-10 rounded-full border-2 border-primary bg-black",
            isPlaying ? "invisible" : "animate-ping",
          )}
        />
      </div>
    </>
  );
}
