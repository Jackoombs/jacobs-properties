import clsx from "clsx";

interface Props {
  text: string;
  textColor?: string;
  addClasses?: string;
}

export default function PageHeader({
  text,
  textColor = "text-primary-100",
  addClasses,
}: Props) {
  return (
    <h1
      className={clsx(
        "text-[2.375rem] font-bold leading-[1.1] md:text-[4.5rem]",
        textColor,
        addClasses
      )}
    >
      {text}
    </h1>
  );
}
