import Hero from "@/components/landing-page/hero";
import Intro from "@/components/landing-page/intro";
import Gallery from "@/components/landing-page/gallery";
import Skills from "@/components/landing-page/skills";
import About from "@/components/landing-page/about";
import Contact from "@/components/landing-page/contact";
import ScrollBeam from "@/components/scroll-beam";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      
      {/* Beam pathway container - starts after Hero, ends before Contact */}
      <div className="relative">
        <ScrollBeam />
        
        <div className="relative z-10">
          <Intro />
          <Gallery />
          <Skills />
          <About />
        </div>
      </div>
      
      <Contact />
    </main>
  );
}


