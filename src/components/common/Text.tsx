import { cn } from "@/lib/utils";

interface CommonProps {
  children: React.ReactNode;
  textColor?: string;
  className?: string;
}

export function SectionLabel({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
}: CommonProps & { padding?: "none" | "hero-md" | "hero-lg" }) {
  return (
    <p
      className={cn(
        "text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] lg:text-[0.875rem]",
        textColor,
        padding === "hero-md" && "pb-2 2xl:pb-6",
        padding === "hero-lg" && "pb-2",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PageHeader({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
}: CommonProps & { padding?: "none" | "hero" }) {
  return (
    <h1
      className={cn(
        "text-[2.375rem] font-bold leading-[1.1] xl:text-[3.25rem] 3xl:text-[4.5rem]",
        textColor,
        padding === "hero" && "pb-3 2xl:pb-7",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function Display({ children, textColor = "text-primary-100", className }: CommonProps) {
  return (
    <h2
      className={cn(
        "text-[2.25rem] font-bold leading-[1.1] lg:text-[4rem]",
        textColor,
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubHeader({
  children,
  textColor = "text-primary-100",
  size,
  className,
}: CommonProps & { size: "sm" | "lg" }) {
  if (size === "sm") {
    return (
      <h4
        className={cn(
          "text-[1.25rem] font-semibold leading-[1.2] lg:text-[1.35rem] xl:text-[1.5rem]",
          textColor,
          className,
        )}
      >
        {children}
      </h4>
    );
  }
  return (
    <h3
      className={cn(
        "text-[1.625rem] font-semibold leading-[1.33] xl:text-[2rem]",
        textColor,
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function SectionHeader({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
  as: Tag = "h2",
}: CommonProps & {
  padding?: "none" | "hero" | "misc";
  /** Heading level for the page outline; "p" keeps the styling without adding a heading. */
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag
      className={cn(
        "text-[1.75rem] font-semibold leading-[1.25] lg:text-[2rem] xl:text-[2.375rem]",
        padding === "hero" && "pb-3 2xl:pb-6",
        padding === "misc" && "pb-9 2xl:pb-[4.5rem]",
        textColor,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
