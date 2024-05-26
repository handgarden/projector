import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function mclsx(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
