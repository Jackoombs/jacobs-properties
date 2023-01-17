import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  padding?: "none" | "hero-md" | "hero-lg";
  className?: string;
}

export default function SectionLabel({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
}: Props) {
  return (
    <p
      className={clsx(
        "text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] lg:text-[0.875rem]",
        textColor,
        padding === "hero-md" && "pb-2 lg:pb-6",
        padding === "hero-lg" && "pb-2",
        className
      )}
    >
      {children}
    </p>
  );
}
