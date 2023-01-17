import clsx from "clsx";

interface Props {
  children: string;
  textColor?: string;
  size: "sm" | "lg";
  className?: string;
}

export default function SectionSubHeader({
  children,
  textColor = "text-primary-100",
  size,
  className,
}: Props) {
  return (
    <>
      {size === "lg" && (
        <h3
          className={clsx(
            "text-[1.625rem] font-semibold leading-[1.33] md:text-[2rem]",
            textColor,
            className
          )}
        >
          {children}
        </h3>
      )}
      {size === "sm" && (
        <h4
          className={clsx(
            "text-[1.25rem] font-semibold leading-[1.5] md:text-[1.5rem]",
            textColor,
            className
          )}
        >
          {children}
        </h4>
      )}
    </>
  );
}
