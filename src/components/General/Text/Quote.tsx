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
    <p
      className={clsx(
        "text-[1.5rem] font-bold leading-[1.33] md:text-[2rem]",
        textColor,
        addClasses
      )}
    >
      “{text}”
    </p>
  );
}
