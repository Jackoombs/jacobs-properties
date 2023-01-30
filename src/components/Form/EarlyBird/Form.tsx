import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import FormWrapper from "../ReactHook/FormWrapper";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStepWrapper from "../ReactHook/FormStepWrapper";

export default function Form() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    mode: "all",
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <FormProvider {...methods}>
      <FormWrapper
        submitHandler={handleSubmit(onSubmit)}
        steps={1}
        {...{ currentStep, setCurrentStep }}
      >
        <FormStepWrapper formStep={0} {...{ currentStep }}>
          <FormStep1 />
        </FormStepWrapper>
        <FormStepWrapper formStep={1} {...{ currentStep }}>
          <FormStep2 />
        </FormStepWrapper>
      </FormWrapper>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </FormProvider>
  );
}
