import { useState } from "react";
import type { Client } from "../../env";
import DropdownCard from "./DropdownCard";
import DropdownJson from "./Dropdown.json";

interface Props {
  client: Client | "valuation";
  color?: string;
}

export default function Dropdown({ color, client }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const dropdownCards = DropdownJson[client];

  return (
    <ul className="flex flex-col items-center gap-2">
      {dropdownCards.map(({ reason, text }, index) => (
        <DropdownCard
          key={index}
          {...{ index, reason, text, currentIndex, setCurrentIndex, color }}
        />
      ))}
    </ul>
  );
}
