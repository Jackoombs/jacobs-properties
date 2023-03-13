import clsx from "clsx";
import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  value: "buy" | "rent";
  onChange: (...args: any) => any;
  updateSelectOnChange?: boolean;
  variant?: "primary" | "secondary";
  colSpanFull?: boolean;
  size?: "sm" | "lg";
}

export default function BuyRentToggle({
  name,
  value,
  onChange,
  updateSelectOnChange = false,
  variant = "primary",
  colSpanFull = false,
  size = "lg",
}: Props) {
  const { setValue } = useFormContext();

  return (
    <>
      <input
        className="hidden"
        type="checkbox"
        checked={value === "rent" ? true : false}
        readOnly
        id={name}
      />
      <div
        className={clsx(
          "justify-self-center text-[0.875rem] text-primary-100",
          colSpanFull && "col-span-full",
          size === "lg" && "w-[20rem]",
          size === "sm" && "w-[15rem]"
        )}
      >
        <div
          className={clsx(
            "relative flex h-[4.625rem] w-full items-center rounded-big ",
            variant === "primary" && "bg-primary-200",
            variant === "secondary" && "bg-white"
          )}
        >
          <label
            onClick={(e) => {
              onChange(value === "buy" ? "rent" : "buy");
              if (updateSelectOnChange) {
                setValue("minPrice", "");
                setValue("maxPrice", "");
              }
            }}
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
              variant === "primary" && value === "buy" && "text-white"
            )}
          >
            Buy
          </label>
          <label
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
              variant === "primary" && value === "rent" && "text-white"
            )}
            onClick={(e) => {
              onChange(value === "buy" ? "rent" : "buy");
              if (updateSelectOnChange) {
                setValue("minPrice", "");
                setValue("maxPrice", "");
              }
            }}
          >
            Rent
          </label>
          <div
            className={clsx(
              "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-lg  duration-300 ease-in-out",
              value === "buy" ? "left-[5px]" : "left-[calc(50%+5px)]",
              variant === "primary" && "bg-primary-100",
              variant === "secondary" && "bg-secondary-100"
            )}
          ></div>
        </div>
      </div>
    </>
  );
}
