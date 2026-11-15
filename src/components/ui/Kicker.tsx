import { cn } from "@/lib/cn";

/** The small line above a heading: a gold tick, then a label. */
export default function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      data-reveal
      className={cn("label text-accent flex items-center gap-4", className)}
    >
      <span aria-hidden="true" className="bg-accent/60 h-px w-10" />
      {children}
    </p>
  );
}
