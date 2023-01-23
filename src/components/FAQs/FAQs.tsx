import { useState } from "react";
import FAQCard from "./FAQCard";
import type { FAQType } from "../../env";

interface Props {
  bgColor?: string;
  FAQTemplate: FAQType[];
}

export default function FAQs({ bgColor, FAQTemplate }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <ul className="flex flex-col items-center gap-2 md:gap-5">
      {FAQTemplate.map(({ question, answer }, index) => (
        <FAQCard
          key={index}
          {...{
            bgColor,
            index,
            question,
            answer,
            currentIndex,
            setCurrentIndex,
          }}
        />
      ))}
    </ul>
  );
}
