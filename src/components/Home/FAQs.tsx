import { useState } from "react";
import FAQCard from "./FAQCard";

export default function FAQs() {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <div className="flex flex-col items-center gap-1">
      <FAQCard
        index={1}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
      <FAQCard
        index={2}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
      <FAQCard
        index={3}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
    </div>
  );
}
