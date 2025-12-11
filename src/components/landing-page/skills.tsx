"use client";

import { useEffect, useRef } from "react";
import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

type ToolStackType = {
  title: string;
  icon: string;
  tools: string[];
};

const toolStack: ToolStackType[] = [
  {
    title: "Basics",
    icon: "ph:code-thin",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    icon: "ph:database-thin",
    tools: ["FastAPI", "Express.js"],
  },
  {
    title: "Frontend",
    icon: "ph:browser-thin",
    tools: ["Next.js", "React.js", "ReactNative", "TailwindCSS"],
  },
  {
    title: "Databases",
    icon: "ph:cylinder-thin",
    tools: ["SQLite", "MongoDB", "ArangoDB", "PostgreSQL"],
  },
  {
    title: "Others",
    icon: "ph:toolbox-thin",
    tools: ["Figma", "Notion", "TickTick"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
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

    // Staggered items
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
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
      ref={containerRef}
      className="relative w-full bg-smooth-black px-6 py-32 text-smooth-white md:px-16 md:py-48"
    >
      {/* Section header */}
      <div className="mx-auto mb-24 max-w-5xl text-center md:mb-32">
        <h2
          ref={titleRef}
          className={cn(italiana.className, "text-5xl md:text-8xl")}
        >
          Tools & Technologies
        </h2>
      </div>

      {/* Skills grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-12">
        {toolStack.map((stack, index) => (
          <div
            key={stack.title}
            ref={(el) => {
              if (itemsRef.current) itemsRef.current[index] = el;
            }}
            className="group flex flex-col gap-6 border-l border-white/10 pl-6 transition-colors hover:border-primary/50"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3">
              <Icon
                icon={stack.icon}
                width="20"
                height="20"
                className="text-gray-500 transition-colors group-hover:text-primary"
              />
              <h3 className={cn(italiana.className, "text-xl md:text-2xl")}>
                {stack.title}
              </h3>
            </div>

            {/* Tools list */}
            <ul className="flex flex-col gap-3">
              {stack.tools.map((tool) => (
                <li
                  key={tool}
                  className="text-sm font-light text-gray-500 transition-colors hover:text-white"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

