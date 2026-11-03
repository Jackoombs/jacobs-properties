import { useState } from "react";
import { CloseCircleIcon } from "@/components/common/FilledIcons";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const quickLinks = [
  { text: "Find a home", link: "/property-search" },
  { text: "Value my home", link: "/valuation" },
];

const ourServices = [
  { text: "Buyers", link: "/buyers" },
  { text: "Sellers", link: "/sellers" },
  { text: "Landlords", link: "/landlords" },
  { text: "Tenants", link: "/tenants" },
];

const aboutUs = [
  { text: "About us", link: "/about-us" },
  { text: "News", link: "/news" },
  { text: "Area guides", link: "/area-guides" },
  { text: "Contact us", link: "/contact-us" },
];

function MenuSection({
  heading,
  items,
  size,
  className,
}: {
  heading: string;
  items: { text: string; link: string }[];
  size: "sm" | "lg";
  className?: string;
}) {
  return (
    <section className={cn("w-full md:max-w-[23.125rem]", className)}>
      <hr className="border-secondary-100 pb-5 md:hidden" />
      <h3 className="pb-4 text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] text-white md:pb-7 md:text-[0.875rem]">
        {heading}
      </h3>
      <ul>
        {items.map(({ text, link }, index) => (
          <li key={link} className="flex flex-col justify-between">
            <hr className="hidden border-secondary-100 md:inline" />
            <a
              className={cn(
                "block py-3 normal-case duration-100 hover:text-secondary-100 md:py-7",
                size === "sm" && "text-[1.4rem] font-medium lg:text-[2rem]",
                size === "lg" &&
                  "text-3xl font-bold leading-[1.1] lg:text-[2.875rem] lg:font-medium",
              )}
              href={link}
            >
              {text}
            </a>
            {index === items.length - 1 && (
              <hr className="hidden border-secondary-100 md:inline" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="h-7"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label="Open menu"
      >
        <div className="flex h-full max-h-5 w-9 flex-col justify-between duration-150 hover:max-h-7">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                // Header sets --menu-bar-bg to recolour these when it's
                // transparent over a hero; falls back to the normal blue.
                "h-[0.125rem] bg-[var(--menu-bar-bg,var(--color-primary-100))]",
                isHover && "bg-secondary-100 duration-150",
              )}
            />
          ))}
        </div>
      </button>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="border-none bg-primary-100 p-0 data-[side=right]:w-full data-[side=right]:max-w-none data-[side=right]:sm:max-w-none"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <nav className="flex h-full w-full flex-col items-center justify-start overflow-y-auto text-white leading-normal md:justify-center">
          <div className="flex h-auto w-full max-w-container-lg flex-col gap-4 py-[2rem] md:flex-row md:items-center md:justify-center lg:gap-[3.875rem]">
            <button
              className="self-end md:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseCircleIcon className="size-6 text-white" />
            </button>
            <MenuSection
              heading="quicklinks"
              items={quickLinks}
              size="lg"
              className="self-start pt-8 md:pt-0"
            />
            <MenuSection heading="our services" items={ourServices} size="sm" />
            <MenuSection
              heading="about us"
              items={aboutUs}
              size="sm"
              className="pb-12 md:pb-0"
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-[5vw] top-[5vh] order-1 hidden p-4 md:inline"
              aria-label="Close menu"
            >
              <CloseCircleIcon className="size-[1.875rem] text-white" />
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
