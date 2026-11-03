import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "8 Mar 23" — the short date the news cards use. UTC so a date-only ISO
 *  string can't slip back a day in a timezone behind Greenwich. */
export function formatShortDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}
