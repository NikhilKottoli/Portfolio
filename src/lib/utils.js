import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Custom utility function to merge Tailwind CSS classes and handle conditional classes.
 * @param {...(string | string[] | Record<string, any> | null | undefined)} inputs - The class name inputs.
 * @returns {string} The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}