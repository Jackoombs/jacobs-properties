import clsx from "clsx";
interface Props {
  children: string;
  variant?:
    | "primary"
    | "secondary"
    | "white"
    | "transparent-white"
    | "transparent-blue";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  onClick?: (...args: any) => any;
}

export default function Button({
  children,
  variant = "primary",
  size,
  type = "button",
  className,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "flex h-14 w-full items-center justify-center rounded-big px-6 text-[0.875rem] font-semibold uppercase tracking-[1.4px] duration-100",
        className,
        variant === "primary" && "bg-primary-100 text-white hover:bg-[#053B7C]",
        variant === "secondary" &&
          "bg-secondary-100 text-primary-100 hover:bg-[#D3ED35]",
        variant === "white" && "bg-white text-primary-100 hover:bg-[#F2FBFF]",
        variant === "transparent-white" &&
          "border-2 border-white bg-transparent text-white hover:border-primary-100 hover:bg-primary-100 hover:text-white",
        variant === "transparent-blue" &&
          "border-2 border-primary-100 bg-transparent text-primary-100 hover:bg-primary-100 hover:text-white",
        size === "sm" && "md:w-16",
        size === "md" && "md:w-max md:min-w-[10rem]",
        size === "lg" && "md:w-max md:min-w-[13rem]"
      )}
    >
      {children}
    </button>
  );
}
