import { useId } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownBold } from "@/components/common/FilledIcons";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** A "Label: [ value v ]" dropdown, used for sorting and filtering lists. */
export default function LabelledSelect({ label, options, value, onChange, className }: Props) {
  // A generated id, so several selects on one page never share an id and each
  // label focuses its own control.
  const id = useId();

  return (
    <div className={cn("flex items-center gap-4 text-base text-primary-100", className)}>
      <label className="cursor-pointer font-semibold" htmlFor={id}>
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          icon={<ChevronDownBold className="pointer-events-none size-3.5 text-primary-100" />}
          className="w-40 cursor-pointer border-none bg-transparent p-0 pr-4 text-base font-normal text-primary-100 shadow-none hover:bg-transparent data-[size=default]:h-6"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
