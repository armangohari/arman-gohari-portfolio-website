import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// The `cn` function takes any number of arguments of type `ClassValue`,
// merges them using `clsx`, and then merges the resulting class names using `twMerge`.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
