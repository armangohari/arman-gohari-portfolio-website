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

    // Animate the path on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.5,
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
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glow filter */}
          <filter id="beam-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for the beam */}
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Glow layer - thick for visibility */}
        <path
          ref={glowRef}
          d="M 50 0
             Q 50 5, 25 12
             Q 0 19, 20 28
             Q 40 37, 75 45
             Q 110 53, 80 62
             Q 50 71, 20 80
             Q -10 89, 50 100"
          fill="none"
          stroke="#00ffff"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#beam-glow)"
          opacity="0.4"
        />

        {/* Main beam path */}
        <path
          ref={pathRef}
          d="M 50 0
             Q 50 5, 25 12
             Q 0 19, 20 28
             Q 40 37, 75 45
             Q 110 53, 80 62
             Q 50 71, 20 80
             Q -10 89, 50 100"
          fill="none"
          stroke="url(#beam-gradient)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}


