"use client";

import { useEffect, useRef } from "react";
import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

type InterestStackType = {
  title: string;
  icon: string;
  interests: string[];
};

const interestStack: InterestStackType[] = [
  {
    title: "Science",
    icon: "ph:atom-thin",
    interests: ["Astronomy", "Psychology", "Neuroscience"],
  },
  {
    title: "Technology",
    icon: "ph:cpu-thin",
    interests: ["AR / VR", "Mixed Reality", "Artificial Intelligence"],
  },
  {
    title: "Art",
    icon: "ph:paint-brush-thin",
    interests: ["UI / UX Design", "Guitar & Music", "Interior Design"],
  },
  {
    title: "Finance",
    icon: "ph:chart-line-up-thin",
    interests: ["Crypto Trade", "Crypto Investment", "Wealth Management"],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title reveal
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Text reveal
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Staggered items reveal
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 py-32 text-smooth-white md:px-16 md:py-48"
    >
      {/* Section header */}
      <div className="mx-auto mb-24 max-w-5xl text-center md:mb-32">
        <h2
          ref={titleRef}
          className={cn(italiana.className, "mb-8 text-5xl md:text-8xl")}
        >
          About
        </h2>

        <p
          ref={textRef}
          className="mx-auto max-w-2xl text-base font-light leading-relaxed text-gray-400 md:text-xl md:leading-loose"
        >
          Eager to explore, learn, and create; always tried to follow my passion
          which led me to so many great things so far.
        </p>
      </div>

      {/* Interests section title */}
      <h3
        className={cn(
          italiana.className,
          "mb-16 text-center text-3xl md:mb-20 md:text-5xl"
        )}
      >
        Interests
      </h3>

      {/* Interests grid - horizontal layout matching reference */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
        {interestStack.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              if (itemsRef.current) itemsRef.current[index] = el;
            }}
            className="flex flex-col items-start gap-6"
          >
            {/* Icon + Title row */}
            <div className="flex items-center gap-3">
              <Icon
                icon={item.icon}
                width="24"
                height="24"
                className="text-gray-400"
              />
              <h4
                className={cn(italiana.className, "text-xl md:text-2xl")}
              >
                {item.title}
              </h4>
            </div>

            {/* Interests list */}
            <ul className="flex flex-col gap-3">
              {item.interests.map((interest) => (
                <li
                  key={interest}
                  className="text-sm font-light text-gray-500 transition-colors hover:text-white"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

