import { BsCheck } from "react-icons/bs/index.js";
import clsx from "clsx";

interface Props {
  name: string;
  label: string;
  value: boolean;
  onChange: (...args: any) => any;
}

export default function CheckboxInput({ name, value, onChange, label }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <input
          className="h-6 w-6 cursor-pointer appearance-none rounded-md border border-primary-100 focus:border-[#ff1010] focus:outline-none"
          id={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
        />

        <BsCheck
          className={clsx(
            "pointer-events-none absolute text-xl text-primary-100",
            value ? "block" : "hidden"
          )}
        />
      </div>
      <label
        className="cursor-pointer font-harm text-xs text-primary-100"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
