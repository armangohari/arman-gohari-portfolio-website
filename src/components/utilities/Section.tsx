"use client";

import { cn } from "@/utils/helpers";
import { ReactNode, useEffect, useRef } from "react";
import SectionOrb from "./SectionOrb";
import { italiana } from "@/lib/fonts";

type SectionProps = {
  title: string;
  orbDirection: "left" | "right";
  tabId: number;
  children: ReactNode;
};

export default function Section({
  title,
  orbDirection,
  tabId,
  children,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const innerHeight = window.innerHeight;
    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.style.height = `${innerHeight}px`;
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full px-[5vw] sm:px-[10vw]"
    >
      {/* Blurred Orb - right/left align based on `orbDirection` prop */}
      <div
        className={cn(
          "absolute -top-24",
          orbDirection === "left" && "-left-24",
          orbDirection === "right" && "-right-24",
        )}
      >
        <SectionOrb />
      </div>

      {/* Title */}
      <div
        className={cn(
          italiana.className,
          "flex w-full items-center justify-center pb-[7vh] pt-[5vh]",
        )}
      >
        <h3 className="text-7xl sm:text-9xl">{title}</h3>
      </div>

      {/* Children */}
      <div className="grid place-items-center">{children}</div>
    </section>
  );
}
