import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import HeroOrb from "../utilities/HeroOrb";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Top Right Orb */}
      <div className="absolute -top-10 right-10 max-sm:hidden">
        <HeroOrb />
      </div>

      {/* Middle Left Orb */}
      <div className="absolute -left-10 top-72 max-sm:scale-75">
        <HeroOrb />
      </div>

      {/* Title */}
      <div
        className={cn(
          italiana.className,
          "relative h-screen w-full text-[11vh] sm:text-[18vw]",
        )}
      >
        <h1 className="absolute left-[10vw] top-[30vh] sm:left-10 sm:top-[2vh]">
          Arman
        </h1>
        <h1 className="absolute bottom-[35vh] right-[10vw] sm:bottom-[2vh] sm:right-10">
          Gohari
        </h1>
      </div>

      {/* Position Headlines */}
      <div className="absolute bottom-[5vh] left-[10vw] sm:bottom-0 sm:left-0 sm:p-10">
        <h2 className="text-smooth-gray sm:text-xl">
          Web Designer & Developer
        </h2>
      </div>
    </section>
  );
}
