import type { SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa/index.js";

interface Props {
  options: string[];
  label: string;
  name: string;
  setState: React.Dispatch<SetStateAction<string>>;
}

export default function SortInput({ options, label, name, setState }: Props) {
  return (
    <div className="flex items-center gap-4 pb-6 text-base text-primary-100">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          onChange={(e) => setState(e.currentTarget.value)}
          className="w-40 appearance-none bg-white font-normal"
          id={name}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 text-sm text-primary-100" />
      </div>
    </div>
  );
}
