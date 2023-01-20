import clsx from "clsx";
import { BsStarFill } from "react-icons/bs/index.js";

interface Props {
  children: string;
  author: string;
  color?: "standard" | "alt";
}

export default function Review({
  children,
  author,
  color = "standard",
}: Props) {
  return (
    <div
      className={clsx(
        "flex max-w-3xl flex-col gap-6 md:items-center",
        color === "alt" ? "text-primary-100" : "text-white"
      )}
    >
      <div className="flex gap-1 text-lg text-secondary-100">
        {[...Array(5)].map((e, index) => (
          <BsStarFill key={index} />
        ))}
      </div>
      <p className="leading-10md:max-w-[51.25rem] text-[1.5rem] font-medium md:text-center lg:text-[2rem]">
        {children}
      </p>
      <p className="font-harm text-base lg:text-[1.25rem]">{author}</p>
    </div>
  );
}
