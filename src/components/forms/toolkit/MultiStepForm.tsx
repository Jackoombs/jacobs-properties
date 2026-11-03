import { cn } from "@/lib/utils";
import ProgressDots from "./ProgressDots";

interface Props {
  children: React.ReactNode;
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export default function MultiStepForm({
  children,
  steps,
  currentStep,
  setCurrentStep,
  onSubmit,
  className,
}: Props) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn("flex w-full flex-col items-center gap-5", className)}
    >
      {steps !== currentStep && (
        <ProgressDots steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
      )}
      {children}
    </form>
  );
}
