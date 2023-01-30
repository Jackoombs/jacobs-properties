import clsx from "clsx";
import { Children } from "react";
import FormButton from "./FormButton";
import FormProgressBar from "./FormProgressBar";

interface Props {
  children: JSX.Element | JSX.Element[];
  steps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitHandler: (...args: any) => any;
}

export default function FormWrapper({
  children,
  steps,
  currentStep,
  setCurrentStep,
  submitHandler,
}: Props) {
  return (
    <form
      noValidate
      onSubmit={submitHandler}
      className="flex w-full flex-col items-center gap-5"
    >
      <FormProgressBar {...{ steps, currentStep, setCurrentStep }} />
      {children}
      <div
        className={clsx(
          "mx-auto flex w-full max-w-[25rem]",
          currentStep === 0 ? "justify-end" : "justify-between"
        )}
      >
        <FormButton type="prev" {...{ steps, currentStep, setCurrentStep }} />
        <FormButton type="next" {...{ steps, currentStep, setCurrentStep }} />
        <FormButton type="submit" {...{ steps, currentStep, setCurrentStep }} />
      </div>
    </form>
  );
}
