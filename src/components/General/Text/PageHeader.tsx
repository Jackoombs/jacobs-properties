import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  padding?: "none" | "hero";
  addClasses?: string;
}

export default function PageHeader({
  text,
  textColor = "text-primary-100",
  padding = "none",
  addClasses,
}: Props) {
  return (
    <h1
      className={clsx(
        "text-[2.375rem] font-bold leading-[1.1] lg:text-[4.5rem]",
        textColor,
        padding === "hero" && "pb-3 lg:pb-7",
        addClasses
      )}
    >
      {text}
    </h1>
  );
}
