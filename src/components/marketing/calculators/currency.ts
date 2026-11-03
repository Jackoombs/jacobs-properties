export function formatGbp(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(value);
}

/** Strips any trailing "(10%)" suffix and every non-numeric character. */
export function parseNumber(formatted: string): number {
  return Number(formatted.replace(/\([^)]*\)/, "").replace(/[^\d.]/g, ""));
}
