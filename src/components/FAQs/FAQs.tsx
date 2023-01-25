import { useState } from "react";
import FAQCard from "./FAQCard";
import FAQJson from "./FAQS.json";
import type { Client } from "../../env";

interface Props {
  bgColor?: string;
  client: Client;
  maxFAQs?: number;
}

export default function FAQs({ bgColor, client, maxFAQs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const FAQTemplate = FAQJson[client];

  return (
    <ul className="flex flex-col items-center gap-2 md:gap-5">
      {FAQTemplate.slice(0, maxFAQs).map(({ question, answer }, index) => (
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
