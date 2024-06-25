"use client";

import Image, { StaticImageData } from "next/image";
import Section from "../utilities/Section";
import Link from "next/link";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/framerAnimationConstants";

type projectType = {
  id: number;
  image: string; // fix: change to StaticImageData after completion
  title: string;
  desc: string;
  url: string;
};

const projects: projectType[] = [
  // fix: fill in with projects
  {
    id: 1,
    image: "",
    title: "",
    desc: "",
    url: "",
  },
  {
    id: 2,
    image: "",
    title: "",
    desc: "",
    url: "",
  },
  {
    id: 3,
    image: "",
    title: "",
    desc: "",
    url: "",
  },
];

export default function Projects() {
  return (
    <Section title="Projects" orbDirection="left" tabId={2}>
      {/* Project Showcase */}
      <motion.div
        className="z-10 mt-[3vh] flex w-full items-center justify-between gap-[3vmax] max-sm:flex-col"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {/* Projects */}
        {projects.map(({ id, image, title, desc, url }: projectType) => (
          <motion.div
            key={id}
            className="grid h-[21.5vh] w-full place-items-center rounded-xl bg-black/20 sm:h-[60vh]"
            variants={itemVariants}
          >
            <span className="animate-pulse text-smooth-gray max-sm:text-sm sm:rotate-[-30deg]">
              Coming Soon
            </span>
            {/* <Link href={url}>
              // Project Image
              <Image src={image} alt="" />
              // Project Title
              <h5>{title}</h5>
              // Project Description
              <p>{desc}</p>
            </Link> */}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
