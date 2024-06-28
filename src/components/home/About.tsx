"use client";

import { italiana } from "@/lib/fonts";
import {
  containerVariants,
  itemVariants,
} from "@/lib/framerAnimationConstants";
import { cpu, layers, market, paint } from "@/lib/icons";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Section from "../utilities/Section";

type interestStackType = {
  icon: StaticImageData;
  title: string;
  interests: string[];
};

const interestStack: interestStackType[] = [
  {
    icon: layers,
    title: "Science",
    interests: ["Astronomy", "Psychology", "Neuroscience"],
  },
  {
    icon: cpu,
    title: "Technology",
    interests: ["AR / VR", "Mixed Reality", "Artificial Intelligence"],
  },
  {
    icon: paint,
    title: "Art",
    interests: ["UI / UX Design", "Guitar & Music", "Interior Design"],
  },
  {
    icon: market,
    title: "Finance",
    interests: ["Crypto Trade", "Crypto Investment", "Wealth Management"],
  },
];

export default function About() {
  return (
    <Section title="About" orbDirection="right" tabId={1}>
      {/* About Me Description */}
      <div className="mb-[7vh] w-[320px] sm:w-[525px]">
        <p className="text-center text-sm font-thin sm:text-2xl">
          Eager to explore, learn, and create; always tried to follow my passion
          which led me to so many great things so far.
        </p>
      </div>

      {/* Interests Showcase */}
      <h4 className={cn(italiana.className, "text-4xl sm:text-6xl")}>
        Interests
      </h4>
      <motion.div
        className="mt-[7vh] grid w-full grid-cols-2 items-start justify-between gap-y-[4vh] sm:flex sm:gap-[5vw]"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {/* Interests */}
        {interestStack.map(({ icon, title, interests }: interestStackType) => (
          <motion.div
            key={title}
            className="flex flex-col items-start justify-between gap-[2.5vh]"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {/* InterestStack Icon */}
              <Image src={icon} alt={title} className="h-6 w-6 sm:h-8 sm:w-8" />

              {/* interestStack Title */}
              <h5
                className={cn(
                  italiana.className,
                  "mb-[1vh] text-xl sm:text-3xl",
                )}
              >
                {title}
              </h5>
            </div>

            {/* interestStack Interests */}
            {interests.map((tool: interestStackType["interests"][number]) => (
              <h6 key={tool} className="text-sm font-thin sm:text-lg">
                {tool}
              </h6>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
