import FormButton from "./FormButton";
import clsx from "clsx";

interface Props {
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitText: string;
}

export default function FormStepButtons({
  steps,
  currentStep,
  setCurrentStep,
  submitText,
}: Props) {
  return (
    <div
      className={clsx(
        "mx-auto flex w-full",
        currentStep === 0 ? "justify-end" : "justify-between"
      )}
    >
      <FormButton type="prev" {...{ steps, currentStep, setCurrentStep }} />
      <FormButton type="next" {...{ steps, currentStep, setCurrentStep }} />
      <FormButton
        type="submit"
        {...{ steps, currentStep, setCurrentStep, submitText }}
      />
    </div>
  );
}
