"use client";

import { italiana } from "@/lib/fonts";
import {
  containerVariants,
  itemVariants,
} from "@/lib/framerAnimationConstants";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import Section from "../utilities/Section";

type interestStackType = {
  title: string;
  interests: string[];
};

const interestStack: interestStackType[] = [
  {
    title: "Science",
    interests: ["Astronomy", "Psychology", "Neuroscience"],
  },
  {
    title: "Technology",
    interests: [
      "AR / VR",
      "Mixed Reality",
      "Artificial Intelligence",
    ],
  },
  {
    title: "Art",
    interests: ["UI / UX Design", "Guitar & Music", "Interior Design"],
  },
  {
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
        {interestStack.map(({ title, interests }: interestStackType) => (
          <motion.div
            key={title}
            className="flex flex-col items-start justify-between gap-[2.5vh]"
            variants={itemVariants}
          >
            {/* interestStack Title */}
            <h5
              className={cn(italiana.className, "mb-[1vh] text-xl sm:text-3xl")}
            >
              {title}
            </h5>
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
