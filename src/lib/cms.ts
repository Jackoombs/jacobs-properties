// Strapi returns media URLs relative to the CMS origin (e.g. "/uploads/foo.webp").
// Resolve them against PUBLIC_CMS_URL so pages work whether the CMS is on
// localhost in dev or a separate host in production.
export function cmsImageUrl(image?: { url?: string } | null): string | undefined {
  if (!image?.url) return undefined;
  if (image.url.startsWith("http")) return image.url;
  const base = import.meta.env.PUBLIC_CMS_URL.replace(/\/$/, "");
  return `${base}${image.url}`;
}

/**
 * Tailwind's static scanner needs literal class strings — `bg-${variant}`
 * would never generate the CSS. Map the CMS enum to full literal classes.
 */
export function heroBgClass(variant?: string): string {
  switch (variant) {
    case "primary-100":
      return "bg-primary-100";
    case "white":
      return "bg-white";
    case "primary-200":
    default:
      return "bg-primary-200";
  }
}
