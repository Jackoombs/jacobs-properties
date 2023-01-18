import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  padding?: "none" | "hero";
  className?: string;
}

export default function PageHeader({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
}: Props) {
  return (
    <h1
      className={clsx(
        "text-[2.375rem] font-bold leading-[1.1] xl:text-[4.5rem]",
        textColor,
        padding === "hero" && "pb-3 lg:pb-7",
        className
      )}
    >
      {children}
    </h1>
  );
}
