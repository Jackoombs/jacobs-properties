import clsx from "clsx";
import { BiLoaderAlt } from "react-icons/bi/index.js";
import type { SubmitState } from "../../../env";
import { useFormContext } from "react-hook-form";

interface Props {
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitText: string;
  submitState: SubmitState;
}

export default function SubmitButton({
  steps,
  currentStep,
  setCurrentStep,
  submitText,
  submitState,
}: Props) {
  const buttonText = () => {
    if (submitState === "default") {
      return submitText;
    } else if (submitState === "loading") {
      return <BiLoaderAlt className="animate-spin text-2xl" />;
    } else if (submitState === "error") {
      return "Try Again";
    }
  };

  return (
    <button
      type="submit"
      className={clsx(
        "flex h-14 w-full min-w-[9rem] items-center justify-center rounded-big bg-secondary-100 px-8 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:bg-[#D3ED35] disabled:cursor-not-allowed disabled:bg-gray-400 md:w-max",
        currentStep !== steps - 1 && "hidden"
      )}
    >
      {buttonText()}
    </button>
  );
}
