import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import { ReactNode } from "react";
import Navigation from "./Navigation";
import SectionOrb from "./SectionOrb";
import ClientSection from "./ClientSection";

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
      {/* Desktop Tab Navigation - Left Side */}
      <div className="absolute bottom-0 left-10 top-0 grid place-items-center max-sm:hidden">
        <Navigation tabId={tabId} />
      </div>

      <div className="mx-auto max-w-6xl px-[5vw] sm:px-[2vw]">
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

        {/* Title */}
        <div
          className={cn(
            italiana.className,
            "flex w-full items-center justify-center pb-[7vh] pt-[5vh]",
          )}
        >
          <h3 className="text-7xl sm:text-9xl">{title}</h3>
        </div>

        {/* Children */}
        <ClientSection>
          {children}
        </ClientSection>


        {/* Mobile Tab Navigation - Left Side */}
        <div className="absolute bottom-[2vh] left-0 right-0 sm:hidden">
          <Navigation tabId={tabId} />
        </div>
      </div>
    </section>
  );
}
