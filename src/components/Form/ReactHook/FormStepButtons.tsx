import FormButton from "./FormButton";
import SubmitButton from "./SubmitButton";
import clsx from "clsx";
import type { SubmitState } from "../../../env";

interface Props {
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitText: string;
  submitState: SubmitState;
}

export default function FormStepButtons({
  steps,
  currentStep,
  setCurrentStep,
  submitText,
  submitState,
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
      <SubmitButton
        {...{ steps, currentStep, setCurrentStep, submitText, submitState }}
      />
    </div>
  );
}
