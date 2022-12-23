import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  size: "sm" | "lg";
  addClasses?: string;
}

export default function SectionSubHeader({
  text,
  textColor = "text-primary-100",
  size,
  addClasses,
}: Props) {
  return (
    <>
      {size === "lg" && (
        <h3
          className={clsx(
            "text-[1.625rem] font-semibold leading-[1.33] md:text-[2rem]",
            textColor,
            addClasses
          )}
        >
          {text}
        </h3>
      )}
      {size === "sm" && (
        <h4
          className={clsx(
            "text-[1.25rem] font-semibold leading-[1.5] md:text-[1.5rem]",
            textColor,
            addClasses
          )}
        >
          {text}
        </h4>
      )}
    </>
  );
}
