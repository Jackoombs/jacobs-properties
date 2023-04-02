import clsx from "clsx";

interface Props {
  children: string | JSX.Element;
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
        "font-normal leading-[1.25]",
        className,
        textColor,
        size === "sm" && "text-[0.75rem]",
        size === "md" && "text-[1rem] lg:text-[1.15rem]",
        size === "lg" && "text-[1.125rem] lg:text-[1.2rem] 2xl:text-[1.375rem]",
        padding === "hero-md" && "pb-6 2xl:pb-7",
        padding === "hero-lg" && "pb-6 2xl:pb-11"
      )}
    >
      {children}
    </p>
  );
}
