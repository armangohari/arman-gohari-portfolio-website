import { cn } from "@/utils/helpers";

type NavigationProps = {
  tabId: number;
};

export default function Navigation({ tabId }: NavigationProps) {
  const numOfSections = 3;

  return (
    <nav className="flex items-center justify-center gap-2 xl:flex-col xl:gap-3">
      {Array.from({ length: numOfSections }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "bg-smooth-gray/20 grid h-1 w-1 -rotate-90 place-items-center rounded-full xl:h-2 xl:w-2",
            tabId === i + 1 &&
              "bg-smooth-gray text-smooth-black text-sm font-bold",
          )}
        ></span>
      ))}
    </nav>
  );
}
