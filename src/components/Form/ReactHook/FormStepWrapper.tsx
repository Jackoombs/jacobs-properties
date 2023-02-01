import clsx from "clsx";

interface Props {
  children: JSX.Element | JSX.Element[];
  formStep: number;
  currentStep: number;
  width?: string;
}

export default function FormStepWrapper({
  children,
  formStep,
  currentStep,
  width = "md:w-[25rem]",
}: Props) {
  return (
    <>
      {currentStep >= formStep && (
        <div
          className={clsx(
            "flex w-full flex-col gap-6",
            width,
            formStep === currentStep ? "block" : "hidden"
          )}
        >
          {formStep >= currentStep && children}
        </div>
      )}
    </>
  );
}
