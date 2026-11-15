/**
 * Every word on the page lives here, so the story can be edited without
 * touching a component. The through-line is the name itself: a *gohari* is
 * a jeweller — one who finds the gem inside a rough stone.
 */

export type Tone = "dark" | "green" | "light";

export const site = {
  name: "Arman Gohari",
  location: "Tehran, Iran",
  url: "https://armangohari.com",
  email: "hello@armangohari.com",
  roles: [
    "Founder — Aramito",
    "Co-founder — LeviTutor",
    "AI Architect · Full-Stack Engineer",
    "Master's — University of Tehran",
  ],
  tagline: "Bridging the gap between abstract ambition and deployed reality.",
  description:
    "Arman Gohari — founder of Aramito, co-founder of LeviTutor, AI architect and full-stack engineer, studying technology entrepreneurship at the University of Tehran. The story of a rough stone, cut and polished.",
};

export const chapters = [
  {
    id: "rough",
    numeral: "I",
    title: "The Rough",
    line: "Where every gem begins.",
    tone: "dark",
  },
  {
    id: "cut",
    numeral: "II",
    title: "The Cut",
    line: "Four strikes toward the centre.",
    tone: "green",
  },
  {
    id: "brilliant",
    numeral: "III",
    title: "The Brilliant",
    line: "What the cutting was for.",
    tone: "light",
  },
  {
    id: "polish",
    numeral: "IV",
    title: "The Polish",
    line: "The part nobody asks for.",
    tone: "dark",
  },
  {
    id: "setting",
    numeral: "V",
    title: "The Setting",
    line: "Where the stone meets the world.",
    tone: "light",
  },
] as const satisfies readonly {
  id: string;
  numeral: string;
  title: string;
  line: string;
  tone: Tone;
}[];

export type ChapterId = (typeof chapters)[number]["id"];

export const prologue = {
  entries: [
    {
      word: "gohar",
      kind: "noun, Persian",
      senses: ["a gem; a jewel.", "essence — the true nature of a thing."],
    },
    {
      word: "gohari",
      kind: "noun",
      senses: ["one who works with gems; a jeweller."],
    },
    {
      word: "arman",
      kind: "noun",
      senses: ["an ideal; the thing worth aiming at."],
    },
  ],
  statement: [
    "My name is a job description.",
    "A gohari takes a rough stone and finds the gem inside it. I do the same with ideas — I only swapped the stones for software.",
  ],
  caption: "Founder of Aramito · University of Tehran",
};

export const rough = {
  kicker: "2020 — where it starts",
  heading: "Every gem starts as a stone nobody looks at twice.",
  body: "Mine was curiosity, in too many directions at once. The night sky. The human mind. Machines that learn. Markets that never sleep. A guitar in the corner of the room. I studied computer engineering so that all of it could share one language.",
  veins: [
    {
      icon: "science",
      title: "Science",
      items: ["Astronomy", "Psychology", "Neuroscience"],
    },
    {
      icon: "technology",
      title: "Technology",
      items: ["Artificial intelligence", "Machine learning", "Mixed reality"],
    },
    {
      icon: "art",
      title: "Art",
      items: ["Interface design", "Guitar", "Interior design"],
    },
    {
      icon: "markets",
      title: "Markets",
      items: ["Crypto", "Foreign exchange", "Algorithmic trading"],
    },
  ],
  footnote: {
    label: "B.Eng. Computer Engineering",
    place: "Imam Khomeini International University",
    years: "2020 — 2025",
  },
} as const;

export const cut = {
  kicker: "2023 — today",
  heading: "A stone is not shaped in one stroke.",
  body: "Four strikes, each one closer to the centre.",
  strikes: [
    {
      index: "01",
      name: "The first strike",
      company: "Arelia AI",
      role: "Founder & Lead Developer",
      period: "Jan — Sep 2023",
      place: "On-site",
      text: "My first company. Nine months of doing every job at once — prototype, code, copy, marketing — and learning exactly how far an idea is from a product.",
      skills: ["Next.js", "Python", "Prototyping", "Start-up management"],
    },
    {
      index: "02",
      name: "The wheel",
      company: "Karlancer",
      role: "Full-Stack Engineer · Freelance",
      period: "Sep 2023 — Jul 2024",
      place: "Remote",
      text: "Eleven months of client work. Front end, back end and infrastructure, from Next.js to FastAPI — plus the parts no framework teaches: communication and negotiation.",
      skills: ["Full-stack", "FastAPI", "Infrastructure", "Negotiation"],
    },
    {
      index: "03",
      name: "The brilliant",
      company: "Aramito",
      role: "Founder",
      period: "Aug 2024 — today",
      place: "Tehran",
      text: "The stone I had been cutting toward all along. An AI companion for mental health, built for Persian speakers — on the sharp edge where product vision meets hard engineering.",
      skills: ["Product", "AI architecture", "Technical leadership"],
    },
    {
      index: "04",
      name: "The second stone",
      company: "LeviTutor",
      role: "Co-founder",
      period: "2026 — today",
      place: "EdTech",
      text: "A second stone on the bench, cut alongside the first: a personal AI tutor for every student, delivered to schools and learning centres under their own brand.",
      skills: ["AI tutoring", "White-label SaaS", "Education"],
    },
  ],
} as const;

export const brilliant = {
  kicker: "Selected work",
  heading: "The proof is in the stone.",
  feature: {
    name: "Aramito",
    lede: "The always-awake companion for your mind.",
    body: "A mental-health platform for Persian speakers. Aram, its AI companion, is there at 3 a.m. with no appointment. Licensed psychologists are one booking away. And with your permission, what Aram has learned becomes the briefing your therapist reads before the session.",
    mine: "As founder, my job is to architect the execution — from the knowledge graph and the memory behind every conversation to the last pixel of the interface.",
    stat: { value: "6,000+", label: "people have started the journey" },
    meta: [
      { k: "Role", v: "Founder — product & engineering" },
      { k: "Since", v: "August 2024" },
      { k: "Where", v: "Tehran, Iran" },
      { k: "Stack", v: "Next.js · FastAPI · PostgreSQL · ArangoDB" },
    ],
    tags: ["AI companion", "Human therapists", "Persian-first", "24 / 7"],
    href: "https://www.aramito.com",
    image: "/assets/images/aramito-sanctuary.webp",
    imageAlt:
      "Aramito brand artwork: an olive sapling growing from a river stone inside a limestone arch, a pearl floating beside it.",
  },
  second: {
    name: "LeviTutor",
    role: "Co-founder",
    lede: "AI tutoring for every student, built for your institution.",
    body: "One platform, the school's own brand. Every institute gets its own workspace, every student a tutor that adapts to their pace and works through problems step by step, and every teacher the oversight to assign, watch and step in.",
    pillars: [
      {
        k: "For students",
        v: "A personal AI tutor, at any hour, that explains rather than answers.",
      },
      {
        k: "For teachers",
        v: "Assign exercises, follow progress, intervene when it matters.",
      },
      {
        k: "For institutions",
        v: "A branded workspace, class management and analytics.",
      },
    ],
    meta: [
      { k: "Role", v: "Co-founder" },
      { k: "Since", v: "2026" },
      { k: "Stack", v: "Next.js · PostgreSQL · retrieval-augmented AI" },
    ],
    href: "https://levitutor.top",
  },
  works: [
    {
      year: "2023",
      name: "Arelia AI",
      text: "My first venture — founder and lead developer.",
      stack: "Next.js · Tailwind CSS · Python",
      href: null,
    },
    {
      year: "—",
      name: "Almastalayi",
      text: "An autonomous crypto-trading platform on the BingX API. The name is Persian for golden diamond.",
      stack: "Python · MongoDB · React",
      href: null,
    },
    {
      year: "—",
      name: "Bayan Paint & Coatings",
      text: "Landing page for a paint and coatings manufacturer — design, front end and SEO.",
      stack: "React · Vite · Tailwind CSS",
      href: "https://github.com/armangohari/bayan-paint-and-coatings-landing-page",
    },
    {
      year: "2026",
      name: "This portfolio",
      text: "The page you are scrolling: a hand-written WebGL gem, liquid glass, and no 3D library.",
      stack: "Next.js · GSAP · WebGL",
      href: "https://github.com/armangohari/arman-gohari-portfolio-website",
    },
  ],
} as const;

export const polish = {
  kicker: "Craft",
  heading: "Polish is the part nobody asks for and everybody notices.",
  body: "A jeweller grades a stone on four Cs. I hold my work to the same four.",
  cs: [
    {
      c: "Clarity",
      field: "Product",
      icon: "clarity",
      text: "Knowing what the product is before it exists — and what it must never become.",
    },
    {
      c: "Colour",
      field: "Design",
      icon: "colour",
      text: "Interfaces with warmth and intent. I design in Figma, then finish the design in code.",
    },
    {
      c: "Cut",
      field: "Engineering",
      icon: "cut",
      text: "Full-stack, end to end: TypeScript and Python, Next.js to FastAPI, Postgres to knowledge graphs.",
    },
    {
      c: "Carat",
      field: "Ownership",
      icon: "carat",
      text: "The weight of the outcome. From first sketch to market, and everything that comes after launch.",
    },
  ],
  marquee: [
    ["TypeScript", "Python", "Next.js", "React", "FastAPI", "PostgreSQL"],
    ["ArangoDB", "MongoDB", "Tailwind CSS", "Docker", "Figma", "NumPy"],
  ],
  toolkit: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    {
      group: "Front end",
      items: ["Next.js", "React", "React Native", "Tailwind CSS"],
    },
    { group: "Back end", items: ["FastAPI", "Express", "Docker", "NGINX"] },
    {
      group: "Data & AI",
      items: ["PostgreSQL", "MongoDB", "ArangoDB", "NumPy", "Pandas"],
    },
    { group: "Design & flow", items: ["Figma", "Notion", "TickTick"] },
  ],
  university: {
    kicker: "Still on the wheel",
    name: ["University", "of Tehran"],
    years: "2026 — 2028",
    status: "In progress",
    degree:
      "Master's in Entrepreneurship Management — Technology Entrepreneurship.",
    body: "A graduate programme at the Faculty of Entrepreneurship, focused on building and scaling technology ventures — studied while building two of them. A gem is never really finished; you only decide when to stop polishing. I haven't.",
    focus: [
      "Entrepreneurship",
      "Strategic thinking",
      "Technology commercialisation",
      "Business model innovation",
      "Marketing strategy",
    ],
  },
  wheel: {
    heading: "Also on the record.",
    items: [
      {
        years: "Dec 2025",
        title: "Professional Skills for Future Leaders",
        place: "Iran Elites Network",
        note: "Certificate",
      },
      {
        years: "2020 — 2025",
        title: "B.Eng., Computer Engineering",
        place: "Imam Khomeini International University",
        note: "Degree",
      },
      {
        years: "Oct 2024",
        title: "9th Startup Camp",
        place: "Diginext",
        note: "Certificate",
      },
    ],
    languages: "Persian — native  ·  English — proficient",
  },
} as const;

export const setting = {
  kicker: "Contact",
  heading: ["Have something rough?", "Let's cut it."],
  body: "I'm building Aramito and LeviTutor, and studying technology entrepreneurship at the University of Tehran. I always have time for a good conversation — about health tech, education, AI, or the stone you can't stop turning over.",
  seal: "Arman Gohari · Aramito · LeviTutor · University of Tehran · Open to a good conversation · ",
  now: [
    { k: "Building", v: "Aramito", href: "https://www.aramito.com" },
    { k: "Co-founding", v: "LeviTutor", href: "https://levitutor.top" },
    { k: "Studying at", v: "University of Tehran", href: null },
  ],
  links: [
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "in/armangohari",
      href: "https://www.linkedin.com/in/armangohari/",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "armangohari",
      href: "https://github.com/armangohari",
    },
    {
      id: "telegram",
      label: "Telegram",
      handle: "@armangohari",
      href: "https://telegram.me/armangohari",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@armanigohari",
      href: "https://instagram.com/armanigohari",
    },
    {
      id: "x",
      label: "X",
      handle: "@armanigohari",
      href: "https://x.com/armanigohari",
    },
  ],
  motto: "Building engines of growth, not just software.",
} as const;
