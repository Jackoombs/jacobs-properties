import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepForm from "@/components/forms/toolkit/MultiStepForm";
import StepPanel from "@/components/forms/toolkit/StepPanel";
import StepButtons from "@/components/forms/toolkit/StepButtons";
import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import SuccessStep from "@/components/forms/toolkit/SuccessStep";
import { TextField, TextAreaField } from "@/components/forms/toolkit/fields";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import type { SubmitState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FormValues {
  address: string;
  buyOrRent: "buy" | "rent";
  fullName: string;
  email: string;
  telephone: string;
  offer: string;
  message: string;
}

interface Props {
  address: string;
  buyOrRent: "buy" | "rent";
  propertyId?: string;
  setIsOpen: (open: boolean) => void;
}

export default function Form({ address, buyOrRent, propertyId, setIsOpen }: Props) {
  const steps = 2;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: { address, buyOrRent },
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (currentStep !== steps - 1) return;
    setSubmitState("loading");
    try {
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/makeanoffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, propertyId }),
      });
      if (!res.ok) throw new Error("Request failed");
      setCurrentStep((curr) => curr + 1);
    } catch (err) {
      setSubmitState("error");
    }
  };

  return (
    <div
      className={cn(
        "w-full flex-1 py-10",
        currentStep === steps ? "bg-primary-100" : "bg-primary-200",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-container-lg items-center justify-center">
        <FormProvider {...methods}>
          <MultiStepForm
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col items-center gap-5 md:w-max">
              <StepPanel step={0} currentStep={currentStep}>
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Submit an offer</SectionHeader>
                  <Copy size="lg">Provide your contact details so we can get in touch.</Copy>
                </div>
                <FieldGrid>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    placeholder="Full name*"
                    hideLabel
                    colSpanFull
                    required
                  />
                  <TextField
                    name="email"
                    label="Email"
                    placeholder="Email address*"
                    hideLabel
                    colSpanFull
                    required
                    type="email"
                  />
                  <TextField
                    name="telephone"
                    label="Telephone"
                    placeholder="Telephone*"
                    hideLabel
                    colSpanFull
                    required
                    type="tel"
                  />
                </FieldGrid>
              </StepPanel>

              <StepPanel step={1} currentStep={currentStep}>
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Submit an offer</SectionHeader>
                  <Copy size="lg">Make your offer below and leave any details.</Copy>
                </div>
                <FieldGrid>
                  <TextField
                    name="offer"
                    label="My offer*"
                    placeholder="E.g. 500000"
                    colSpanFull
                    required
                    type="number"
                  />
                  <TextAreaField
                    name="message"
                    label="Your requirements"
                    placeholder="Message..."
                    rows={6}
                    colSpanFull
                  />
                </FieldGrid>
              </StepPanel>

              <StepPanel step={2} currentStep={currentStep} className="">
                <SuccessStep
                  heading="Thanks for submitting your offer."
                  message="We will be in touch with you shortly."
                  onClose={() => setIsOpen(false)}
                />
              </StepPanel>

              {currentStep !== steps && (
                <StepButtons
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  submitText="Submit offer"
                  submitState={submitState}
                />
              )}
            </div>
          </MultiStepForm>
        </FormProvider>
      </div>
    </div>
  );
}
