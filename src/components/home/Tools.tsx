"use client";

import { italiana } from "@/lib/fonts";
import {
  containerVariants,
  itemVariants,
} from "@/lib/framerAnimationConstants";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import Section from "../utilities/Section";

type toolStackType = {
  title: string;
  tools: string[];
};

const toolStack: toolStackType[] = [
  {
    title: "Basics",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    tools: ["FastAPI", "Express.js"],
  },
  {
    title: "Frontend",
    tools: ["Next.js", "React.js", "ReactNative", "TailwindCSS"],
  },
  {
    title: "Databases",
    tools: ["SQLite", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Others",
    tools: ["Figma", "Notion", "TickTick"],
  },
];

export default function Tools() {
  return (
    <Section title="Tools" orbDirection="left" tabId={2}>
      {/* Tools Showcase */}
      <motion.div
        className="mt-[7vh] grid w-full grid-cols-3 items-start justify-between gap-[7vw] gap-y-[7vh] sm:mt-[15vh] sm:flex"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {/* Tools */}
        {toolStack.map(({ title, tools }: toolStackType) => (
          <motion.div
            key={title}
            className="flex flex-col items-start justify-between gap-[2.5vh]"
            variants={itemVariants}
          >
            {/* ToolStack Title */}
            <h5
              className={cn(italiana.className, "mb-[1vh] text-xl sm:text-3xl")}
            >
              {title}
            </h5>
            {/* ToolStack Tools */}
            {tools.map((tool: toolStackType["tools"][number]) => (
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
