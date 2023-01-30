import clsx from "clsx";

interface Props {
  children: JSX.Element | JSX.Element[];
  formStep: number;
  currentStep: number;
}

export default function FormStepWrapper({
  children,
  formStep,
  currentStep,
}: Props) {
  return (
    <>
      {currentStep >= formStep && (
        <div
          className={clsx(
            "flex w-full flex-col gap-6",
            formStep === currentStep ? "block" : "hidden"
          )}
        >
          {formStep >= currentStep && children}
        </div>
      )}
    </>
  );
}
