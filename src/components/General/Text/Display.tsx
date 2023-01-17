import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  className?: string;
}

export default function Display({
  children,
  textColor = "text-primary-100",
  className,
}: Props) {
  return (
    <h2
      className={clsx(
        "text-[2.25rem] font-bold leading-[1.1] lg:text-[4rem]",
        textColor,
        className
      )}
    >
      {children}
    </h2>
  );
}
