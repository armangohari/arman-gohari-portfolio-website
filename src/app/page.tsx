"use client";

import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Tools from "@/components/home/Tools";
import { useEffect, useRef } from "react";

export default function Home() {
  // Ref to hold the main element
  const mainRef = useRef<HTMLElement>(null);

  // Effect to set the height of the main to innerHeight
  // note: for android chrome address bar overlaying the h-screen
  useEffect(() => {
    const innerHeight = window.innerHeight;
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.style.height = `${innerHeight}px`;
    }
  }, []);

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth *:snap-start">
      <Hero />
      <About />
      <Projects />
      <Tools />
      <Contact />
    </main>
  );
}
