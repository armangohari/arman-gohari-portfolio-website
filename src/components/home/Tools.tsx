import { cn } from "@/utils/helpers";
import Section from "../utilities/Section";
import { italiana } from "@/lib/fonts";

type toolStackType = {
  title: string;
  tools: string[];
};

const toolStack: toolStackType[] = [
  {
    title: "Basics",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    tools: ["FastAPI", "Express.js"],
  },
  {
    title: "Frontend",
    tools: ["Next.js", "React.js", "ReactNative", "TailwindCSS"],
  },
  {
    title: "Databases",
    tools: ["MySQL", "MongoDB", "SQL Server"],
  },
  {
    title: "Others",
    tools: ["Trello", "Figma", "Notion"],
  },
];

export default function Tools() {
  return (
    <Section title="Tools" orbDirection="right" tabId={3}>
      {/* Tools Showcase */}
      <div className="mt-[7vh] grid w-full grid-cols-3 items-start justify-between gap-[7vw] gap-y-[7vh] sm:mt-[15vh] sm:flex">
        {/* Tools */}
        {toolStack.map(({ title, tools }: toolStackType) => (
          <div
            key={title}
            className="flex flex-col items-start justify-between gap-[2.5vh]"
          >
            {/* ToolStack Title */}
            <h5
              className={cn(italiana.className, "mb-[1vh] text-xl sm:text-3xl")}
            >
              {title}
            </h5>
            {/* ToolStack Tools */}
            {tools.map((tool: toolStackType["tools"][number]) => (
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
