import clsx from "clsx";

interface Props {
  children: string;
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
      className={clsx(
        "font-normal leading-[1.5]",
        className,
        textColor,
        size === "sm" && "text-[0.75rem]",
        size === "md" && "text-[0.875rem] lg:text-[1rem]",
        size === "lg" && "text-[1.125rem] lg:text-[1.2rem] xl:text-[1.25rem]",
        padding === "hero-md" && "pb-6 lg:pb-7",
        padding === "hero-lg" && "pb-6 lg:pb-11"
      )}
    >
      {children}
    </p>
  );
}
