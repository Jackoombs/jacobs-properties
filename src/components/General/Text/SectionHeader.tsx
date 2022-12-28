import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  padding?: "none" | "hero" | "misc";
  addClasses?: string;
}

export default function SectionHeader({
  text,
  textColor = "text-primary-100",
  padding = "none",
  addClasses,
}: Props) {
  return (
    <h2
      className={clsx(
        "text-[1.75rem] font-semibold leading-[1.25] lg:text-[2.375rem]",
        padding === "hero" && "pb-3 lg:pb-6",
        padding === "misc" && "pb-9 lg:pb-[4.5rem]",
        textColor,
        addClasses
      )}
    >
      {text}
    </h2>
  );
}
