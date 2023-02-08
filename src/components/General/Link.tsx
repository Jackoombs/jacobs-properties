import clsx from "clsx";
interface Props {
  children: string;
  link: string;
  type:
    | "primary"
    | "secondary"
    | "white"
    | "transparent-white"
    | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
  download?: boolean;
  newTab?: boolean;
}

export default function Link({
  link,
  children,
  type,
  size = "default",
  className,
  download = false,
  newTab = false,
}: Props) {
  return (
    <a
      target={newTab ? "_blank" : "_self"}
      download={download}
      className={clsx(
        "flex h-14 w-full items-center justify-center rounded-big text-[0.875rem] font-semibold uppercase tracking-[1.4px] duration-100",
        className,
        type === "primary" && "bg-primary-100 text-white hover:brightness-110",
        type === "secondary" &&
          "bg-secondary-100 text-primary-100 hover:brightness-110",
        type === "white" && "bg-white text-primary-100 hover:bg-blue-100",
        type === "transparent-white" &&
          "border-2 border-white bg-transparent text-white hover:border-primary-100 hover:bg-primary-100 hover:text-white",
        type === "transparent-blue" &&
          "border-2 border-primary-100 bg-transparent text-primary-100 hover:bg-primary-100 hover:text-white",
        size === "sm" && "md:w-16",
        size === "md" && "md:w-max md:min-w-[10rem]",
        size === "lg" && "md:w-max md:min-w-[13rem]"
      )}
      href={link}
    >
      {children}
    </a>
  );
}
