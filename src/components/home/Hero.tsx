"use client";

import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroOrb from "../utilities/HeroOrb";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Top Right Orb */}
      <aside className="absolute -top-10 right-10 max-sm:hidden">
        <HeroOrb />
      </aside>

      {/* Middle Left Orb */}
      <aside className="absolute top-72 -left-10 max-sm:scale-75">
        <HeroOrb />
      </aside>

      {/* Title */}
      <header
        className={cn(
          italiana.className,
          "relative h-screen w-full text-[11vh] sm:text-[18vw]",
        )}
      >
        <motion.h1
          className="absolute top-[30vh] left-[10vw] sm:top-[2vh] sm:left-10"
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          Arman
        </motion.h1>
        <motion.h1
          className="absolute right-[10vw] bottom-[35vh] sm:right-10 sm:bottom-[2vh]"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          Gohari
        </motion.h1>
      </header>

      {/* Position Headline */}
      <motion.div
        className="absolute bottom-[5vh] left-[10vw] sm:bottom-0 sm:left-0 sm:p-10"
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ amount: 0.1 }}
      >
        <h2 className="text-smooth-gray sm:text-xl">
          Founder of{" "}
          <Link
            href="https://aramito.com"
            className="animate-pulse font-medium"
          >
            Aramito
          </Link>
        </h2>
      </motion.div>
    </section>
  );
}
