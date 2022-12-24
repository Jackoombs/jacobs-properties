import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  index: number;
  text: string;
  value: number;
  isPercent: boolean;
}

export default function StatCard({ index, text, value, isPercent }: Props) {
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
        "flex flex-col justify-between rounded-lg p-12",
        index % 2 === 0
          ? "bg-primary-100 text-white"
          : "bg-secondary-100 text-primary-100"
      )}
    >
      <div className="flex h-full flex-col justify-center gap-7">
        <p className="text-6xl font-bold">{`${Math.round(statValue)}${
          isPercent ? "%" : ""
        }`}</p>
        <p className="text-base font-medium">{text}</p>
      </div>
    </div>
  );
}
