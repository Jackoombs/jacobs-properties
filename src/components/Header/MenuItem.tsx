import clsx from "clsx";

interface Props {
  index: number;
  arrayLength: number;
  children: string;
  link: string;
  size: "sm" | "lg";
}

export default function MenuItem({
  index,
  arrayLength,
  children,
  link,
  size,
}: Props) {
  return (
    <li className="flex flex-col justify-between">
      <hr className="hidden border-secondary-100 md:inline" />
      <a
        className={clsx(
          "py-3 normal-case duration-100 hover:text-secondary-100 md:py-7",
          size === "sm" && "text-[1.4rem] font-medium lg:text-[2rem]",
          size === "lg" &&
            "text-3xl font-bold leading-[1.1] lg:text-[2.875rem] lg:font-medium"
        )}
        href={link}
      >
        {children}
      </a>
      {index === arrayLength - 1 && (
        <hr className="hidden border-secondary-100 md:inline" />
      )}
    </li>
  );
}
