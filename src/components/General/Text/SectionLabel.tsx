import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  padding?: "none" | "hero-md" | "hero-lg";
  addClasses?: string;
}

export default function SectionLabel({
  text,
  textColor = "text-primary-100",
  padding = "none",
  addClasses,
}: Props) {
  return (
    <p
      className={clsx(
        "text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] lg:text-[0.875rem]",
        textColor,
        padding === "hero-md" && "pb-2 lg:pb-6",
        padding === "hero-lg" && "pb-2",
        addClasses
      )}
    >
      {text}
    </p>
  );
}
