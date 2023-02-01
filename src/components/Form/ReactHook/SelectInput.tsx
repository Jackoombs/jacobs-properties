import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa/index.js";
import type { RegisterOptions } from "react-hook-form";
import Error from "./Error";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: string[] | number[];
  colSpanFull?: boolean;
  required?: boolean;
  hideLabel?: boolean;
}

export default function SelectInput({
  name,
  label,
  placeholder,
  options,
  colSpanFull = false,
  required = false,
  hideLabel = false,
}: Props) {
  const { register } = useFormContext();

  let registerOptions: RegisterOptions = {
    required: {
      value: required,
      message: "This is a required field",
    },
  };

  return (
    <div
      className={clsx("flex flex-col gap-2", colSpanFull && "col-span-full")}
    >
      <label
        className={clsx(
          "font-harm text-xs text-primary-100",
          hideLabel && "hidden"
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <select
          {...register(name, registerOptions)}
          className="flex h-16 w-full cursor-pointer appearance-none items-center rounded-big border border-primary-100 bg-transparent px-4 text-primary-100
        placeholder:text-primary-100 focus:border-[#ff1010] focus:outline-none lg:min-w-[11.5rem]"
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 text-sm text-primary-100" />
      </div>
      <Error {...{ name }} />
    </div>
  );
}
