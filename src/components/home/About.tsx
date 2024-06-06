import { italiana } from "@/lib/fonts";
import Section from "../utilities/Section";
import { cn } from "@/utils/helpers";

type interestStackType = {
  title: string;
  interests: string[];
};

const interestStack: interestStackType[] = [
  {
    title: "Art",
    interests: ["Architecture", "UI / UX Design", "Guitar & Music"],
  },
  {
    title: "Technology",
    interests: [
      "Virtual Reality",
      "Augmented Reality",
      "Artificial Intelligence",
    ],
  },
  {
    title: "Science",
    interests: ["Geometry", "Astronomy", "Psychology"],
  },
  {
    title: "Finance",
    interests: ["FinTech", "Crypto Trade", "Crypto Investment"],
  },
];

export default function About() {
  return (
    <Section title="About" orbDirection="right" tabId={2}>
      {/* About Me Description */}
      <div className="mb-[10vh] w-[320px] sm:w-[525px]">
        <p className="text-center text-sm font-thin sm:text-2xl">
          Eager to explore, learn, and create; always tried to follow my passion
          which led me to so many great things so far.
        </p>
      </div>

      {/* Interests Showcase */}
      <h4 className={cn(italiana.className, "text-4xl sm:text-6xl")}>
        Interests
      </h4>
      <div className="mt-[7vh] grid grid-cols-2 items-start justify-between gap-y-[4vh] sm:flex sm:gap-[5vw]">
        {/* Interests */}
        {interestStack.map(({ title, interests }: interestStackType) => (
          <div
            key={title}
            className="flex flex-col items-start justify-between gap-[2.5vh]"
          >
            {/* interestStack Title */}
            <h5
              className={cn(italiana.className, "mb-[1vh] text-xl sm:text-3xl")}
            >
              {title}
            </h5>
            {/* interestStack Interests */}
            {interests.map((tool: interestStackType["interests"][number]) => (
              <h6 key={tool} className="text-sm font-thin sm:text-lg">
                {tool}
              </h6>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
