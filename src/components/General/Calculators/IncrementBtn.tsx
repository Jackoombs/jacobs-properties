import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa/index.js";

interface Props {
  handleClick: (arg0: number, arg1: boolean) => void;
  incrementAmount: number;
  isDecrement: boolean;
}

export default function IncrementBtn({
  handleClick,
  incrementAmount,
  isDecrement,
}: Props) {
  return (
    <button
      onClick={() => handleClick(incrementAmount, isDecrement)}
      type="button"
      className={clsx(
        "absolute p-4 text-xs text-primary-100",
        isDecrement ? "left-0 rotate-180" : "right-0"
      )}
    >
      <FaChevronRight />
    </button>
  );
}
