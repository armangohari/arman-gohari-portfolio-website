import Image, { StaticImageData } from "next/image";
import Section from "../utilities/Section";
import Link from "next/link";
import { cn } from "@/utils/helpers";

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
  // fix: complete
  return (
    <Section title="Projects" orbDirection="left" tabId={3}>
      {/* Project Showcase */}
      <div className="z-10 mt-[3vh] flex w-full items-center justify-between gap-[3vmax] max-sm:flex-col">
        {/* Projects */}
        {projects.map(({ id, image, title, desc, url }: projectType) => (
          <div
            key={id}
            className="grid h-[22vh] w-full place-items-center rounded-xl bg-black/20 sm:h-[60vh]"
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
          </div>
        ))}
      </div>
    </Section>
  );
}
