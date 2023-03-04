import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  padding?: "none" | "hero" | "misc";
  className?: string;
}

export default function SectionHeader({
  children,
  textColor = "text-primary-100",
  padding = "none",
  className,
}: Props) {
  return (
    <h2
      className={clsx(
        "text-[1.75rem] font-semibold leading-[1.25] lg:text-[2rem] xl:text-[2.375rem]",
        padding === "hero" && "pb-3 lg:pb-6",
        padding === "misc" && "pb-9 lg:pb-[4.5rem]",
        textColor,
        className
      )}
    >
      {children}
    </h2>
  );
}
