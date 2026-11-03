import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepForm from "@/components/forms/toolkit/MultiStepForm";
import StepPanel from "@/components/forms/toolkit/StepPanel";
import StepButtons from "@/components/forms/toolkit/StepButtons";
import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import SuccessStep from "@/components/forms/toolkit/SuccessStep";
import { TextField } from "@/components/forms/toolkit/fields";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import type { SubmitState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FormValues {
  fullName: string;
  email: string;
}

interface Props {
  buyOrRent: "buy" | "rent";
  /** Downloaded once the enquiry is stored, so a mail hiccup never blocks the guide. */
  pdfUrl: string;
  setIsOpen: (open: boolean) => void;
}

export default function Form({ buyOrRent, pdfUrl, setIsOpen }: Props) {
  const steps = 1;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");

  const methods = useForm<FormValues>({ mode: "all" });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, buyOrRent }),
      });
      if (!res.ok) throw new Error("Request failed");
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "";
      link.click();
      setCurrentStep(1);
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
                  <SectionHeader className="w-full pb-3">Download your guide</SectionHeader>
                  <Copy size="lg">Enter your details below and your download will start automatically.</Copy>
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
                </FieldGrid>
              </StepPanel>

              <StepPanel step={1} currentStep={currentStep} className="">
                <SuccessStep
                  heading="Your download is on its way."
                  message="Thanks for your interest — the guide should have started downloading automatically. If it didn't, check your browser's downloads."
                  headingClassName="max-w-md"
                  messageClassName="max-w-lg"
                  onClose={() => setIsOpen(false)}
                />
              </StepPanel>

              {currentStep !== steps && (
                <StepButtons
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  submitText="Download guide"
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
