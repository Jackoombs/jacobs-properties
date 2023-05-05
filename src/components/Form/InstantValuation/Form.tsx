import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import FormWrapper from "../ReactHook/FormWrapper";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStepWrapper from "../ReactHook/FormStepWrapper";
import FormStepButtons from "../ReactHook/FormStepButtons";
import clsx from "clsx";
import axios from "axios";
import type { SubmitState, Valpal } from "../../../env";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Form({ setIsOpen }: Props) {
  const steps = 3;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");
  const [valpalData, setValpalData] = useState<Valpal | null>(null);

  const methods = useForm({
    mode: "all",
    defaultValues: {
      dates: [{ date: "" }],
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: any) => {
    if (currentStep === steps - 1) {
      setSubmitState("loading");
      try {
        const res = await axios.post(
          import.meta.env.PUBLIC_SERVER_URL + "form/instantvaluation",
          data
        );
        setValpalData(res.data.results);
        setCurrentStep((curr) => curr + 1);
      } catch (err) {
        setSubmitState("error");
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
        "w-full flex-1 py-10",
        currentStep === steps ? "bg-primary-100" : "bg-primary-200"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-container-lg items-center justify-center">
        <FormProvider {...methods}>
          <FormWrapper
            submitHandler={handleSubmit(onSubmit)}
            {...{ currentStep, setCurrentStep, steps }}
          >
            <div
              className={clsx(
                "flex w-full flex-col items-center gap-5",
                currentStep !== steps && "md:w-max"
              )}
            >
              <FormStepWrapper formStep={0} {...{ currentStep }}>
                <FormStep1 />
              </FormStepWrapper>
              <FormStepWrapper formStep={1} {...{ currentStep }}>
                <FormStep2 />
              </FormStepWrapper>
              <FormStepWrapper formStep={2} {...{ currentStep }}>
                <FormStep3 />
              </FormStepWrapper>
              <FormStepWrapper width="" formStep={3} {...{ currentStep }}>
                <FormStep4 {...{ setIsOpen, valpalData }} />
              </FormStepWrapper>
              {currentStep !== steps && (
                <FormStepButtons
                  submitText="Instant valuation"
                  {...{ currentStep, setCurrentStep, steps, submitState }}
                />
              )}
            </div>
          </FormWrapper>
        </FormProvider>
      </div>
    </div>
  );
}
