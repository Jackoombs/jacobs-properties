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
    <div className="mx-auto w-full">
      <div
        className={clsx(
          "flex",
          currentStep === 0 ? "justify-end" : "justify-between"
        )}
      >
        <FormButton type="prev" {...{ steps, currentStep, setCurrentStep }} />
        <FormButton type="next" {...{ steps, currentStep, setCurrentStep }} />
        <SubmitButton
          {...{ steps, currentStep, setCurrentStep, submitText, submitState }}
        />
      </div>
      {currentStep === steps - 1 && (
        <p className="pt-6 text-center font-harm text-xs">
          By clicking ‘{submitText}’ you’re agreeing to our{" "}
          <a
            href="/jacobs-privacy-statement.pdf"
            className="underline"
            target="blank"
          >
            terms & conditions
          </a>
        </p>
      )}
    </div>
  );
}
