"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";

export default function Intro() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current && container.current) {
      const text = textRef.current;
      // Split text logic would go here if we had SplitType, for now we just fade up lines or words if possible
      // or just the whole block

      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={container}
      className="flex min-h-[50vh] w-full items-center justify-center px-8 py-24 md:py-32"
    >
      <p
        ref={textRef}
        className={cn(
            italiana.className,
            "max-w-5xl text-center text-3xl font-extralight leading-relaxed text-smooth-white md:text-5xl lg:text-6xl"
        )}
      >
        Building the future of <span className="text-primary italic">Mental Healthcare</span> with AI at <span className="text-primary italic">Aramito</span>.
      </p>
    </section>
  );
}
