import Nav from "@/components/chrome/Nav";
import Brilliant from "@/components/sections/Brilliant";
import Cut from "@/components/sections/Cut";
import Hero from "@/components/sections/Hero";
import Polish from "@/components/sections/Polish";
import Prologue from "@/components/sections/Prologue";
import Rough from "@/components/sections/Rough";
import Setting from "@/components/sections/Setting";
import Motion from "@/components/stage/Motion";
import Stage from "@/components/stage/Stage";
import Interlude from "@/components/ui/Interlude";
import { chapters, site } from "@/content/story";

const [rough, cut, brilliant, polish, setting] = chapters;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Founder, AI Architect & Full-Stack Engineer",
  worksFor: [
    {
      "@type": "Organization",
      name: "Aramito",
      url: "https://www.aramito.com",
    },
    {
      "@type": "Organization",
      name: "LeviTutor",
      url: "https://levitutor.top",
    },
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Tehran",
      department: "Faculty of Entrepreneurship",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Imam Khomeini International University",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/armangohari/",
    "https://github.com/armangohari",
    "https://x.com/armanigohari",
    "https://instagram.com/armanigohari",
  ],
};

/**
 * One page, one story: a flash-forward to the finished gem, then back to the
 * rough stone and through every stage of cutting it.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Stage />
      <Nav />
      <div className="relative z-10 overflow-x-clip">
        <Hero />
        <main>
          <Prologue />
          <Interlude {...rough} gem={{ morph: 0, polish: 0, tilt: 0.3 }} />
          <Rough />
          <Interlude {...cut} gem={{ morph: 0.3, polish: 0.2, edge: 1 }} />
          <Cut />
          <Interlude
            {...brilliant}
            gem={{ morph: 1, polish: 0.85, edge: 0.22 }}
          />
          <Brilliant />
          <Interlude {...polish} gem={{ morph: 1, polish: 1 }} />
          <Polish />
          <Interlude {...setting} gem={{ morph: 1, polish: 1, tilt: 0.9 }} />
        </main>
        <Setting />
      </div>
      <Motion />
    </>
  );
}
