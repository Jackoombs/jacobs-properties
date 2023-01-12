import clsx from "clsx";
import type React from "react";

interface Props {
  name: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BuyRentToggle({ name, state, setState }: Props) {
  return (
    <>
      <input
        className="hidden"
        id={name}
        onChange={(e) => setState((state) => !state)}
        checked={state}
        type="checkbox"
      />
      <div className="w-full min-w-[19.5rem] justify-self-center text-[0.875rem] text-primary-100 lg:w-[19.5rem]">
        <div className="relative flex h-[4.625rem] w-full items-center rounded-big bg-primary-200">
          <label
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
              !state ? "text-white" : "text-primary-100"
            )}
          >
            Buy
          </label>
          <label
            htmlFor={name}
            className={clsx(
              "relative z-10 flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
              state ? "text-white" : "text-primary-100"
            )}
          >
            Rent
          </label>
          <div
            className={clsx(
              "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-lg bg-primary-100 duration-300 ease-in-out",
              !state ? "left-[5px]" : "left-[calc(50%+5px)]"
            )}
          ></div>
        </div>
      </div>
    </>
  );
}
