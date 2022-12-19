import clsx from "clsx";
interface Props {
  text: string;
  link: string;
  type:
    | "primary"
    | "secondary"
    | "white"
    | "transparent-white"
    | "transparent-blue";
  size: "sm" | "md" | "lg";
  classes?: string;
}

export default function Link({ link, text, type, size, classes }: Props) {
  return (
    <a
      className={clsx(
        "flex h-16 w-full items-center justify-center rounded-lg text-xs font-semibold uppercase duration-100 md:h-[2.75rem]",
        classes,
        type === "primary" && "bg-primary-100 text-white hover:brightness-110",
        type === "secondary" &&
          "bg-secondary-100 text-primary-100 hover:brightness-110",
        type === "white" && "bg-white text-primary-100 hover:bg-blue-100",
        type === "transparent-white" &&
          "border-2 border-white bg-transparent text-white hover:border-primary-100 hover:bg-primary-100 hover:text-white",
        type === "transparent-blue" &&
          "border-2 border-primary-100 bg-transparent text-primary-100 hover:bg-primary-100 hover:text-white",
        size === "sm" && "md:w-16",
        size === "md" && "md:w-40",
        size === "lg" && "md:w-[11.25rem]"
      )}
      href={link}
    >
      {text}
    </a>
  );
}
