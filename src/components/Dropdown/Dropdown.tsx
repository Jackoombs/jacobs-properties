import { useState } from "react";
import DropdownCard from "./DropdownCard";

interface Props {
  dropdownCards: {
    question: string;
    answer: string;
  }[];
}

export default function Dropdown({ dropdownCards }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <div className="flex flex-col items-center gap-2">
      {dropdownCards.map(({ question, answer }, index) => (
        <DropdownCard
          key={index}
          {...{ index, question, answer, currentIndex, setCurrentIndex }}
        />
      ))}
    </div>
  );
}
