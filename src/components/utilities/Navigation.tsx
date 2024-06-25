import { cn } from "@/utils/helpers";

type NavigationProps = {
  tabId: number;
};

export default function Navigation({ tabId }: NavigationProps) {
  const numOfSections = 4;

  return (
    <div className="flex items-center justify-center gap-2 sm:flex-col sm:gap-3">
      {Array.from({ length: numOfSections }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "grid h-1 w-1 -rotate-90 place-items-center rounded-full bg-smooth-gray/20 sm:h-2 sm:w-2",
            tabId === i + 1 &&
              "bg-smooth-gray text-sm font-bold text-smooth-black",
          )}
        ></span>
      ))}
    </div>
  );
}
