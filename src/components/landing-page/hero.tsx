"use client";

import { useEffect, useRef } from "react";
import { italiana } from "@/lib/fonts";
import gsap from "gsap";
import Scene from "@/components/3d/scene";
import { cn } from "@/utils/helpers";
import { Icon } from "@iconify/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleRef.current && subtitleRef.current && lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut", delay: 0.3 }
      )
        .fromTo(
          titleRef.current,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" },
          "-=0.8"
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
          "-=1"
        );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Scene />

      {/* Top gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-smooth-black/50 via-transparent to-transparent" />

      <div className="z-10 flex flex-col items-center justify-center gap-8">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="h-px w-24 origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent md:w-40"
        />

        <h1
          ref={titleRef}
          className={cn(
            italiana.className,
            "text-5xl font-normal tracking-[0.1em] text-smooth-white sm:text-7xl md:text-8xl lg:text-9xl"
          )}
        >
          ARMAN GOHARI
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-lg text-sm font-light tracking-[0.3em] text-gray-400 uppercase md:text-base"
        >
          Startup Founder · Product Designer · Developer
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-70 transition-opacity hover:opacity-100">
        <span className="text-xs tracking-[0.4em] uppercase">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

