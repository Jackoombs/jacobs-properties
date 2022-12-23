import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  addClasses?: string;
}

export default function SectionHeader({
  text,
  textColor = "text-primary-100",
  addClasses,
}: Props) {
  return (
    <h2
      className={clsx(
        "text-[1.75rem] font-semibold leading-[1.25] md:text-[2.375rem]",
        textColor,
        addClasses
      )}
    >
      {text}
    </h2>
  );
}
