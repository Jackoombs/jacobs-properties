import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  textColor?: string;
  size: "sm" | "md" | "lg";
  className?: string;
  padding?: "none" | "hero-md" | "hero-lg";
}

export default function Copy({
  children,
  textColor = "text-primary-100",
  size,
  className,
  padding = "none",
}: Props) {
  return (
    <p
      className={cn(
        "font-normal",
        className,
        textColor,
        size === "sm" && "text-[0.75rem]",
        size === "md" && "text-[1rem] lg:text-[1.15rem]",
        size === "lg" && "text-[1.125rem] lg:text-[1.2rem] 2xl:text-[1.375rem]",
        // Must come after the size classes: tailwind-merge treats a font-size
        // class as overriding an earlier leading-*, so listing this first
        // silently drops it and body copy falls back to the inherited 1.5.
        "leading-[1.25]",
        padding === "hero-md" && "pb-6 2xl:pb-7",
        padding === "hero-lg" && "pb-6 2xl:pb-11",
      )}
    >
      {children}
    </p>
  );
}
