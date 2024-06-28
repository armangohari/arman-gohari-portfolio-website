"use client";

import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import BackgroundMusicPlayer from "./BackgroundMusicPlayer";
import Navigation from "./Navigation";
import SectionOrb from "./SectionOrb";

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
  return (
    <section className="relative h-[100dvh] w-full">
      {/* Music Player - Top Right */}
      <motion.aside
        className="fixed right-0 top-0 p-[2vh]"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        viewport={{ amount: 0.1 }}
      >
        <BackgroundMusicPlayer />
      </motion.aside>

      {/* Desktop Tab Navigation - Left Side */}
      <aside className="absolute bottom-0 left-10 top-0 grid place-items-center max-xl:hidden">
        <Navigation tabId={tabId} />
      </aside>
      {/* Main Section Container */}
      <main className="mx-auto max-w-6xl px-[5vw] sm:px-[2vw]">
        {/* Blurred Orb - right/left align based on `orbDirection` prop */}
        <div
          className={cn(
            "absolute -top-24 max-sm:scale-75",
            orbDirection === "left" && "-left-24",
            orbDirection === "right" && "-right-24",
          )}
        >
          <SectionOrb />
        </div>

        {/* Section Header Title */}
        <motion.header
          className={cn(
            italiana.className,
            "flex w-full items-center justify-center pb-[7vh] pt-[5vh]",
          )}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          viewport={{ amount: 0.1 }}
        >
          <h3 className="text-7xl sm:text-9xl">{title}</h3>
        </motion.header>

        {/* Children */}
        <motion.main
          className="grid place-items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          {children}
        </motion.main>

        {/* Mobile & Tablet Tab Navigation - Left Side */}
        <footer className="absolute bottom-[2vh] left-0 right-0 xl:hidden">
          <Navigation tabId={tabId} />
        </footer>
      </main>
    </section>
  );
}
