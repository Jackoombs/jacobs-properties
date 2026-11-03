import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface Props {
  steps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function ProgressDots({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center">
      {Array.from({ length: steps + 1 }).map((_, i) => (
        <Fragment key={i}>
          <button
            type="button"
            onClick={() => onStepClick?.(i)}
            className={cn(
              "size-4 rounded-full border-primary-100 duration-150",
              i <= currentStep ? "border-4 bg-secondary-100" : "border",
            )}
            aria-label={`Go to step ${i + 1}`}
          />
          {i < steps && <hr className="w-4 border-primary-100" />}
        </Fragment>
      ))}
    </div>
  );
}
