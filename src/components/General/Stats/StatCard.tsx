import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  index: number;
  children: string;
  value: number;
  isPercent: boolean;
}

export default function StatCard({ index, children, value, isPercent }: Props) {
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

  return (
    <div
      className={clsx(
        "flex flex-col justify-between rounded-lg pb-12 text-primary-100"
      )}
    >
      <div className="flex h-full flex-col justify-center">
        <p className="text-[7.25rem] font-bold leading-[6rem]">{`${Math.round(
          statValue
        )}${isPercent ? "%" : ""}`}</p>
        <p className="font-harm text-[1.25rem] font-medium">{children}</p>
      </div>
    </div>
  );
}
