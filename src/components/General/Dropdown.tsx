import { useState } from "react";
import DropdownCard from "../General/DropdownCard";

export default function Dropdown() {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <div className="flex flex-col items-center gap-2">
      <DropdownCard
        index={1}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
      <DropdownCard
        index={2}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
      <DropdownCard
        index={3}
        question="How long will it take to sell my property?"
        answer="In around 3-4 buissness weeks we will have your property sold."
        {...{ currentIndex, setCurrentIndex }}
      />
    </div>
  );
}
