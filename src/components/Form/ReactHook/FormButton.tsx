import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface Props {
  type: "prev" | "next" | "submit";
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitText?: string;
}

export default function FormButton({
  type,
  steps,
  currentStep,
  setCurrentStep,
  submitText = "Register",
}: Props) {
  const {
    formState: { isValid },
  } = useFormContext();

  const buttonText = () => {
    if (type === "prev") {
      return "Go Back";
    }
    if (type === "next") {
      return "Continue";
    }
    if (type === "submit" && submitText) {
      return submitText;
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
      return next();
    }
    if (type === "prev") {
      return prev();
    }
  };

  return (
    <button
      disabled={!isValid && type !== "prev"}
      type={type === "submit" ? "submit" : "button"}
      onClick={handleClick}
      className={clsx(
        "flex h-14 w-full items-center justify-center rounded-big text-[0.875rem] font-semibold uppercase tracking-[1.4px] duration-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:brightness-100 md:w-max",
        (type === "next" || type === "submit") &&
          "bg-secondary-100 text-primary-100 hover:brightness-110",
        type === "prev"
          ? "bg-transparent px-3 text-primary-100"
          : "min-w-[9rem] px-8",
        ((type === "prev" && currentStep === 0) ||
          (type === "next" && currentStep >= steps - 1)) &&
          "hidden",
        type === "submit" && currentStep !== steps - 1 && "hidden"
      )}
    >
      {buttonText()}
    </button>
  );
}
