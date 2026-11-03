import { useFormContext } from "react-hook-form";
import { SpinnerIcon } from "@/components/common/FilledIcons";
import { cn } from "@/lib/utils";
import type { SubmitState } from "@/lib/types";

interface Props {
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitText: string;
  submitState: SubmitState;
}

export default function StepButtons({
  steps,
  currentStep,
  setCurrentStep,
  submitText,
  submitState,
}: Props) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((curr) => curr + 1);
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className={cn("flex", currentStep === 0 ? "justify-end" : "justify-between")}>
        <button
          type="button"
          onClick={() => setCurrentStep((curr) => curr - 1)}
          className={cn(
            "flex h-14 w-full items-center justify-center rounded-big bg-transparent px-3 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 md:w-max",
            currentStep === 0 && "hidden",
          )}
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            "flex h-14 w-full min-w-[9rem] items-center justify-center rounded-big bg-secondary-100 px-8 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:bg-[#D3ED35] md:w-max",
            currentStep >= steps - 1 && "hidden",
          )}
        >
          Continue
        </button>
        <button
          type="submit"
          disabled={submitState === "loading"}
          className={cn(
            "flex h-14 w-full min-w-[9rem] items-center justify-center rounded-big bg-secondary-100 px-8 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:bg-[#D3ED35] disabled:cursor-not-allowed disabled:bg-gray-400 md:w-max",
            currentStep !== steps - 1 && "hidden",
          )}
        >
          {submitState === "loading" ? (
            <SpinnerIcon className="size-6 animate-spin" />
          ) : submitState === "error" ? (
            "Try Again"
          ) : (
            submitText
          )}
        </button>
      </div>
      {currentStep === steps - 1 && (
        <p className="pt-6 text-center font-harm text-xs">
          By clicking ‘{submitText}’ you’re agreeing to our{" "}
          <a
            href="/jacobs-privacy-statement.pdf"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms &amp; conditions
          </a>
        </p>
      )}
    </div>
  );
}
