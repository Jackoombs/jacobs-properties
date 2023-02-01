import clsx from "clsx";
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
      className={clsx("flex w-full flex-col items-center gap-5")}
    >
      {steps !== currentStep && (
        <FormProgressBar {...{ steps, currentStep, setCurrentStep }} />
      )}
      {children}
    </form>
  );
}
