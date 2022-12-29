import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  size: "sm" | "md" | "lg";
  addClasses?: string;
  padding?: "none" | "hero-md" | "hero-lg";
}

export default function Copy({
  text,
  textColor = "text-primary-100",
  size,
  addClasses,
  padding = "none",
}: Props) {
  return (
    <p
      className={clsx(
        "font-normal leading-[1.5]",
        addClasses,
        textColor,
        size === "sm" && "text-[0.75rem]",
        size === "md" && "text-[0.875rem] lg:text-[1rem]",
        size === "lg" && "text-[1.125rem] lg:text-[1.25rem]",
        padding === "hero-md" && "pb-6 lg:pb-7",
        padding === "hero-lg" && "pb-6 lg:pb-11"
      )}
    >
      {text}
    </p>
  );
}
