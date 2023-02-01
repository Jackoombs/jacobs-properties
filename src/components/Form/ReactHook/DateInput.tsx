import ReactDatePicker from "react-datepicker";
import { FaRegCalendar } from "react-icons/fa/index.js";
import type { Noop } from "react-hook-form";
import clsx from "clsx";
import Error from "./Error";

interface Props {
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  name: string;
  label: string;
  hideLabel?: boolean;
}

export default function DateInput({
  value,
  onChange,
  onBlur,
  name,
  label,
  hideLabel = false,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={clsx(
          "font-harm text-xs text-primary-100",
          hideLabel && "hidden"
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <ReactDatePicker
          minDate={new Date()}
          id={name}
          selected={value}
          placeholderText="Please Select a date"
          className="flex h-16 w-full items-center rounded-big border border-primary-100 bg-transparent px-5 text-primary-100
      placeholder:text-primary-100 focus:outline-none lg:min-w-[11.5rem]"
          {...{ value, onChange, onBlur, name }}
        />
        <FaRegCalendar className="text absolute right-5 text-primary-100" />
      </div>
      <Error {...{ name }} />
    </div>
  );
}
