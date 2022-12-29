import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  addClasses?: string;
}

export default function Display({
  text,
  textColor = "text-primary-100",
  addClasses,
}: Props) {
  return (
    <h2
      className={clsx(
        "text-[2.25rem] font-bold leading-[1.1] lg:text-[4rem]",
        textColor,
        addClasses
      )}
    >
      {text}
    </h2>
  );
}
