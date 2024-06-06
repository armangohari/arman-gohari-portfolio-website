"use client"

import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Tools from "@/components/home/Tools";

export default function Home() {
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
