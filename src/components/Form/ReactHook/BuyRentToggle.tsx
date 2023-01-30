import clsx from "clsx";
import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  value: "buy" | "rent";
  onChange: (...args: any) => any;
}

export default function BuyRentToggle({ name, value, onChange }: Props) {
  const { setValue } = useFormContext();

  return (
    <>
      <input
        className="hidden"
        type="checkbox"
        checked={value === "rent" ? true : false}
        onChange={(e) => {
          onChange(value === "buy" ? "rent" : "buy");
          setValue("minPrice", "–");
          setValue("maxPrice", "–");
        }}
        id={name}
      />
      <div className="col-span-full w-full min-w-[19.5rem] justify-self-center text-[0.875rem] text-primary-100">
        <div className="relative flex h-[4.625rem] w-full items-center rounded-big bg-white">
          <label
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300"
            )}
          >
            Buy
          </label>
          <label
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300"
            )}
          >
            Rent
          </label>
          <div
            className={clsx(
              "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-lg bg-secondary-100 duration-300 ease-in-out",
              value === "buy" ? "left-[5px]" : "left-[calc(50%+5px)]"
            )}
          ></div>
        </div>
      </div>
    </>
  );
}
