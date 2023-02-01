import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import Error from "./Error";

export type Props = {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  hideLabel?: boolean;
  colSpanFull?: boolean;
  required?: boolean;
};

export default function TextAreaInput({
  name,
  label,
  placeholder,
  hideLabel = false,
  rows = 5,
  colSpanFull = false,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<any>();

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 text-left",
        colSpanFull && "col-span-full"
      )}
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
      <textarea
        rows={rows}
        {...register(name)}
        className="flex w-full resize-none items-center rounded-big border border-primary-100 bg-transparent px-5 py-4
        text-primary-100 placeholder:text-primary-100 focus:outline-none lg:min-w-[11.5rem]"
        placeholder={placeholder}
      />
      <Error {...{ name }} />
    </div>
  );
}
