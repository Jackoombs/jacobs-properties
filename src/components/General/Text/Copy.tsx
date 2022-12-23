import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  size: "sm" | "md" | "lg";
  addClasses?: string;
}

export default function Copy({
  text,
  textColor = "text-primary-100",
  size,
  addClasses,
}: Props) {
  return (
    <p
      className={clsx(
        "font-normal leading-[1.5]",
        textColor,
        size === "sm" && "text-[0.75rem]",
        size === "md" && "text-[0.875rem] lg:text-[1rem]",
        size === "lg" && "text-[1.125rem] lg:text-[1.25rem]",
        addClasses
      )}
    >
      {text}
    </p>
  );
}
