import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import FormWrapper from "../ReactHook/FormWrapper";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStepWrapper from "../ReactHook/FormStepWrapper";
import FormStepButtons from "../ReactHook/FormStepButtons";
import clsx from "clsx";
import axios from "axios";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Form({ setIsOpen }: Props) {
  const steps = 1;
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: any) => {
    if (currentStep === steps - 1) {
      setCurrentStep((curr) => curr + 1);
      try {
        const res = await axios.post(
          "https://jacobsproperties.api.integratedinterest.com/form/getintouch",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.PUBLIC_INTEGRATEDMARKETING_KEY,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div
      className={clsx(
        "w-full py-10",
        currentStep === steps ? "bg-primary-100" : "bg-primary-200"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-container-lg items-center justify-center">
        <FormProvider {...methods}>
          <FormWrapper
            submitHandler={handleSubmit(onSubmit)}
            {...{ currentStep, setCurrentStep, steps }}
          >
            <div className="flex w-full flex-col items-center gap-5 md:w-max">
              <FormStepWrapper formStep={0} {...{ currentStep }}>
                <FormStep1 />
              </FormStepWrapper>
              <FormStepWrapper width="" formStep={1} {...{ currentStep }}>
                <FormStep2 {...{ setIsOpen }} />
              </FormStepWrapper>

              {currentStep !== steps && (
                <FormStepButtons
                  submitText="SendMessage"
                  {...{ currentStep, setCurrentStep, steps }}
                />
              )}
            </div>
            <pre
              className={
                currentStep === steps ? "text-white" : "text-primary-100"
              }
            >
              {JSON.stringify(watch(), null, 2)}
            </pre>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
}
