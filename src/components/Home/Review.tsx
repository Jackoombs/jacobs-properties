import { BsStarFill } from "react-icons/bs/index.js";

interface Props {
  text: string;
  author: string;
}

export default function Review({ text, author }: Props) {
  return (
    <div className="flex flex-col gap-6 md:items-center">
      <div className="flex gap-1 text-lg text-secondary-100">
        {[...Array(5)].map(() => (
          <BsStarFill />
        ))}
      </div>
      <p className="text-xl font-semibold text-white md:max-w-2xl md:text-center md:text-2xl">
        {text}
      </p>
      <p className="text-sm text-white">{author}</p>
    </div>
  );
}
