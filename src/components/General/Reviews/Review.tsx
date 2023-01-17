import { BsStarFill } from "react-icons/bs/index.js";

interface Props {
  children: string;
  author: string;
}

export default function Review({ children, author }: Props) {
  return (
    <div className="flex flex-col gap-6 md:items-center">
      <div className="flex gap-1 text-lg text-secondary-100">
        {[...Array(5)].map((e, index) => (
          <BsStarFill key={index} />
        ))}
      </div>
      <p className="text-[1.5rem] font-medium leading-10 text-white md:max-w-[51.25rem] md:text-center lg:text-[2rem]">
        {children}
      </p>
      <p className="font-harm text-base text-white lg:text-[1.25rem]">
        {author}
      </p>
    </div>
  );
}
