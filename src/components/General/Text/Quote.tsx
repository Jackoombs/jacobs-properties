import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  className?: string;
}

export default function PageHeader({
  children,
  textColor = "text-primary-100",
  className,
}: Props) {
  return (
    <p
      className={clsx(
        "text-[1.5rem] font-bold leading-[1.33] md:text-[2rem]",
        textColor,
        className
      )}
    >
      “{children}”
    </p>
  );
}
