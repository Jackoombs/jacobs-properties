import clsx from "clsx";
import { Fragment } from "react";

interface Props {
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormProgressBar({
  steps,
  currentStep,
  setCurrentStep,
}: Props) {
  return (
    <div className="flex items-center">
      {[...Array(steps + 1)].map((e, i) => (
        <Fragment key={i}>
          <div
            onClick={() => setCurrentStep(i)}
            key={i}
            className={clsx(
              "h-4 w-4 rounded-full border-primary-100 duration-150",
              i <= currentStep ? "border-4  bg-secondary-100" : "border"
            )}
          ></div>
          {i < steps && <hr className="w-4 border-primary-100" />}
        </Fragment>
      ))}
    </div>
  );
}
