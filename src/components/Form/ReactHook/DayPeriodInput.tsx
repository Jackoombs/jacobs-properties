import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import Error from "./Error";

interface Props {
  index: number;
  hideLabel?: boolean;
}

export default function DayPeriodInput({ index, hideLabel = false }: Props) {
  const { control, watch } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <p
        className={clsx(
          "font-harm text-xs text-primary-100",
          hideLabel && "hidden"
        )}
      >
        Time (you can select more than one)
      </p>
      <fieldset className="grid h-16 grid-cols-3 gap-1 overflow-hidden rounded-big bg-white p-1 text-sm font-normal">
        <legend className="hidden">Time (you can select more than one)</legend>
        <Controller
          control={control}
          name={`dates.${index}.morning`}
          defaultValue={true}
          render={({ field: { onChange, value, name } }) => (
            <div className="flex h-full w-full items-center justify-center">
              <input
                onChange={() => onChange(!value)}
                type="checkbox"
                checked={value}
                id={name}
                className="invisible absolute -left-48"
              />
              <label
                htmlFor={`dates.${index}.morning`}
                className={clsx(
                  "flex h-full w-full cursor-pointer items-center justify-center rounded-big text-sm font-normal duration-300",
                  value
                    ? "bg-primary-100 text-white"
                    : "bg-white text-primary-100"
                )}
              >
                Morning
              </label>
            </div>
          )}
        />

        <Controller
          control={control}
          name={`dates.${index}.afternoon`}
          defaultValue={false}
          render={({ field: { onChange, value, name } }) => (
            <div className="flex h-full w-full items-center justify-center">
              <input
                onChange={() => onChange(!value)}
                type="checkbox"
                checked={value}
                id={name}
                className="invisible absolute -left-48"
              />
              <label
                htmlFor={`dates.${index}.afternoon`}
                className={clsx(
                  "flex h-full w-full cursor-pointer items-center justify-center rounded-big text-sm font-normal duration-300",
                  value
                    ? "bg-primary-100 text-white"
                    : "bg-white text-primary-100"
                )}
              >
                Afternoon
              </label>
            </div>
          )}
        />
        <Controller
          control={control}
          name={`dates.${index}.evening`}
          defaultValue={false}
          render={({ field: { onChange, value, name } }) => (
            <div className="flex h-full w-full items-center justify-center">
              <input
                onChange={() => onChange(!value)}
                type="checkbox"
                checked={value}
                id={name}
                className="invisible absolute -left-48"
              />
              <label
                htmlFor={`dates.${index}.evening`}
                className={clsx(
                  "duration flex h-full w-full cursor-pointer items-center justify-center rounded-big duration-300",
                  value
                    ? "bg-primary-100 text-white"
                    : "bg-white text-primary-100"
                )}
              >
                Evening
              </label>
            </div>
          )}
        />
      </fieldset>
    </div>
  );
}
