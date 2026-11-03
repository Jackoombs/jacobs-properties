import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  incrementAmount: number;
  formatNumber: (value: number) => string;
  getNumber: (formatted: string) => number;
}

function IncrementBtn({
  handleClick,
  incrementAmount,
  isDecrement,
}: {
  handleClick: (increment: number, isDecrement: boolean) => void;
  incrementAmount: number;
  isDecrement: boolean;
}) {
  return (
    <button
      onClick={() => handleClick(incrementAmount, isDecrement)}
      type="button"
      aria-label={isDecrement ? "Decrease" : "Increase"}
      className={cn(
        "absolute p-4 text-primary-100",
        isDecrement ? "left-0 rotate-180" : "right-0",
      )}
    >
      <ChevronRight className="size-3" />
    </button>
  );
}

export default function MortgageInput({
  id,
  label,
  value,
  setValue,
  incrementAmount,
  formatNumber,
  getNumber,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value;
    const valueNoSign = getNumber(raw);

    // Let a trailing decimal point survive so "2." can become "2.5".
    if (/\d+\.$/.test(raw.replace(/[^\d.]/g, "")) && id === "interestRate") {
      return setValue(`${raw.replace(/[^\d.]/g, "")}%`);
    }
    if (/^\d+(\.\d{1,2})?$/.test(valueNoSign.toString())) {
      setValue(formatNumber(valueNoSign));
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setValue((current) =>
        getNumber(current)
          .toString()
          .substring(0, current.length - 1),
      );
    }
  };

  const handleClick = (increment: number, isDecrement: boolean) => {
    setValue((current) => {
      const newValue = getNumber(current) + (isDecrement ? -increment : increment);
      return newValue >= 0 ? formatNumber(newValue) : current;
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-harm text-xs text-white" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          onKeyDown={handleKeydown}
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          className="relative w-full rounded-big bg-white px-6 py-4 text-center text-primary-100/70"
        />
        <IncrementBtn handleClick={handleClick} isDecrement={true} incrementAmount={incrementAmount} />
        <IncrementBtn handleClick={handleClick} isDecrement={false} incrementAmount={incrementAmount} />
      </div>
    </div>
  );
}
