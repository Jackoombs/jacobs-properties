import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface Props {
  type: "prev" | "next";
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormButton({
  type,
  steps,
  currentStep,
  setCurrentStep,
}: Props) {
  const {
    formState: { isValid },
    trigger,
  } = useFormContext();

  const buttonText = () => {
    if (type === "prev") {
      return "Go Back";
    }
    if (type === "next") {
      return "Continue";
    }
  };

  const next = () => {
    setCurrentStep((curr) => curr + 1);
  };

  const prev = () => {
    setCurrentStep((curr) => curr - 1);
  };

  const handleClick = () => {
    if (type === "next") {
      trigger();
      if (isValid) {
        return next();
      }
    }
    if (type === "prev") {
      return prev();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "flex h-14 w-full items-center justify-center rounded-big text-[0.875rem] font-semibold uppercase tracking-[1.4px] duration-100 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-max",
        type === "next" &&
          "min-w-[9rem] bg-secondary-100 px-8 text-primary-100 hover:bg-[#D3ED35]",
        type === "prev" && "bg-transparent px-3 text-primary-100",
        ((type === "prev" && currentStep === 0) ||
          (type === "next" && currentStep >= steps - 1)) &&
          "hidden"
      )}
    >
      {buttonText()}
    </button>
  );
}
