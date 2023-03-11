import clsx from "clsx";
import { useEffect, useState } from "react";
import { priceNumberToPriceString } from "../../utils";

interface Props {
  children: string;
  value: number;
  isPercent: boolean;
  isRounded?: boolean;
  isPrice?: boolean;
}

export default function StatCard({
  children,
  value,
  isPercent,
  isRounded = true,
  isPrice = false,
}: Props) {
  const [statValue, setStatValue] = useState(0);

  const duration = 2000;
  const interval = 100;
  const numberOfIntervals = duration / interval;

  useEffect(() => {
    const id = setInterval(() => {
      setStatValue((oldValue) => oldValue + value / numberOfIntervals);
    }, interval);

    setTimeout(() => {
      clearInterval(id);
      setStatValue(value);
    }, duration);
  }, []);

  const formattedValue = (value: number) => {
    let roundedValue = isRounded
      ? Math.round(value)
      : Math.round(value * 10) / 10;
    let formattedValue = isPrice
      ? priceNumberToPriceString(roundedValue)
      : roundedValue.toLocaleString("en-US");
    if (isPercent) {
      formattedValue += "%";
    }
    return formattedValue;
  };

  return (
    <div
      className={clsx(
        "flex flex-col justify-between rounded-lg pb-12 text-primary-100"
      )}
    >
      <div className="flex h-full flex-col justify-center gap-10">
        <p className="text-[7.25rem] font-bold leading-[6rem]">
          {formattedValue(statValue)}
        </p>
        <p className="max-w-xs font-harm text-[1.25rem] font-medium">
          {children}
        </p>
      </div>
    </div>
  );
}
