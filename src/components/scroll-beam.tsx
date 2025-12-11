"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!pathRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const glow = glowRef.current;
    const pathLength = path.getTotalLength();

    // Set initial state - line is hidden
    gsap.set([path, glow], {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate the path on scroll - true = perfect 1:1 sync, smooth = interpolation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true, // Perfect 1:1 sync with scroll
      },
    });

    tl.to([path, glow], {
      strokeDashoffset: 0,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Large soft glow filter */}
          <filter id="beam-glow-soft" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Tighter glow for the core */}
          <filter id="beam-glow-core" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for the beam */}
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2" />
            <stop offset="20%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Outer soft glow - very dispersed */}
        <path
          d="M 50 0
             Q 50 3, 35 8
             Q 10 15, 15 25
             Q 20 35, 60 42
             Q 100 50, 85 60
             Q 70 70, 35 80
             Q 0 90, 50 100"
          fill="none"
          stroke="#00ffff"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#beam-glow-soft)"
          opacity="0.15"
        />

        {/* Main glow layer */}
        <path
          ref={glowRef}
          d="M 50 0
             Q 50 3, 35 8
             Q 10 15, 15 25
             Q 20 35, 60 42
             Q 100 50, 85 60
             Q 70 70, 35 80
             Q 0 90, 50 100"
          fill="none"
          stroke="#00ffff"
          strokeWidth="0.8"
          strokeLinecap="round"
          filter="url(#beam-glow-core)"
          opacity="0.5"
        />

        {/* Core beam path - brightest */}
        <path
          ref={pathRef}
          d="M 50 0
             Q 50 3, 35 8
             Q 10 15, 15 25
             Q 20 35, 60 42
             Q 100 50, 85 60
             Q 70 70, 35 80
             Q 0 90, 50 100"
          fill="none"
          stroke="url(#beam-gradient)"
          strokeWidth="0.3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}



