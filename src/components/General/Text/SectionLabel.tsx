import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  addClasses?: string;
}

export default function SectionLabel({
  text,
  textColor = "text-primary-100",
  addClasses,
}: Props) {
  return (
    <p
      className={clsx(
        "text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] md:text-[0.875rem]",
        textColor,
        addClasses
      )}
    >
      {text}
    </p>
  );
}
