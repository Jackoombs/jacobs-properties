import { useState } from "react";
import LabelledSelect from "@/components/common/LabelledSelect";

const OPTIONS = [
  "Relevant",
  "Address (A-Z)",
  "Address (Z-A)",
  "Price (Low-high)",
  "Price (High-low)",
] as const;

export type SortOption = (typeof OPTIONS)[number];

export default function SortSelect({
  setState,
  className,
}: {
  setState: (v: SortOption) => void;
  className?: string;
}) {
  const [value, setValue] = useState<SortOption>("Relevant");

  return (
    <LabelledSelect
      label="Sort by:"
      options={OPTIONS}
      value={value}
      onChange={(v) => {
        setValue(v as SortOption);
        setState(v as SortOption);
      }}
      className={className}
    />
  );
}
