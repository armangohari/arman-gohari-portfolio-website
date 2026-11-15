import {
  AiBrain01Icon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  Certificate01Icon,
  ChartLineData01Icon,
  CodeIcon,
  Diamond01Icon,
  EyeIcon,
  GithubIcon,
  GuitarIcon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Menu01Icon,
  Mortarboard01Icon,
  NewTwitterIcon,
  PaintBrush01Icon,
  School01Icon,
  StudentIcon,
  TeacherIcon,
  TelegramIcon,
  Telescope01Icon,
  UniversityIcon,
  WeightScale01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

/** Every icon on the site, from the Hugeicons free set, behind one name. */
const ICONS = {
  science: Telescope01Icon,
  technology: AiBrain01Icon,
  art: GuitarIcon,
  markets: ChartLineData01Icon,
  clarity: EyeIcon,
  colour: PaintBrush01Icon,
  cut: CodeIcon,
  carat: WeightScale01Icon,
  arrowUpRight: ArrowUpRight01Icon,
  arrowRight: ArrowRight02Icon,
  arrowDown: ArrowDown01Icon,
  arrowUp: ArrowUp01Icon,
  linkedin: Linkedin01Icon,
  github: GithubIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  x: NewTwitterIcon,
  mail: Mail01Icon,
  gem: Diamond01Icon,
  menu: Menu01Icon,
  close: Cancel01Icon,
  location: Location01Icon,
  degree: Mortarboard01Icon,
  certificate: Certificate01Icon,
  university: UniversityIcon,
  student: StudentIcon,
  teacher: TeacherIcon,
  institution: School01Icon,
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  size = 20,
  stroke = 1.25,
  className,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={ICONS[name]}
      size={size}
      strokeWidth={stroke}
      color="currentColor"
      className={className}
      aria-hidden="true"
    />
  );
}
