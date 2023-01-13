import { FaChevronDown } from "react-icons/fa/index.js";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: string[] | number[];
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function SelectInput({
  name,
  label,
  placeholder,
  options,
  state,
  setState,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-harm text-xs text-primary-100" htmlFor={name}>
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <select
          id={name}
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
          className="flex h-16 w-full cursor-pointer appearance-none items-center rounded-big border border-primary-100 bg-transparent px-4 text-primary-100
        placeholder:text-primary-100 focus:border-[#ff1010] focus:outline-none lg:min-w-[11.5rem]"
        >
          <option value={placeholder} disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 text-sm text-primary-100" />
      </div>
    </div>
  );
}
