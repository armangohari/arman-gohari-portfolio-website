"use client";

import Image, { StaticImageData } from "next/image";
import Section from "../utilities/Section";
import Link from "next/link";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/constants/framerAnimationConstants";

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
            className="relative grid h-[21.5vh] w-full place-items-center overflow-hidden rounded-xl bg-gray-900 p-px sm:h-[60vh]"
            variants={itemVariants}
          >
            {/* Inner Container */}
            <div className="bg-smooth-black/30 relative z-10 flex h-full w-full animate-pulse items-center justify-center gap-1.5 rounded-xl px-6 py-6">
              {/* Temporary Coming Soon Text */}
              <span className="text-smooth-gray max-sm:text-sm sm:rotate-[-30deg]">
                Coming Soon
              </span>

              {/* Project Contents */}
              {/* <Link href={url}>
              // Project Image
              <Image src={image} alt="" />
              // Project Title
              <h5>{title}</h5>
              // Project Description
              <p>{desc}</p>
            </Link> */}
            </div>

            {/* Circular Motion Orbs */}
            <div className="animate-orbit bg-primary/10 absolute rounded-full p-40 blur-[100px]" />
            <div className="animate-orbit-delayed bg-primary/10 absolute rounded-full p-40 blur-[100px]" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
