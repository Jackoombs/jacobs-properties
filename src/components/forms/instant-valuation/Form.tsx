import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepForm from "@/components/forms/toolkit/MultiStepForm";
import StepPanel from "@/components/forms/toolkit/StepPanel";
import StepButtons from "@/components/forms/toolkit/StepButtons";
import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import SuccessStep, { SuccessCornerClose } from "@/components/forms/toolkit/SuccessStep";
import ValuationPropertyStep, { ValuationAddressFields } from "@/components/forms/toolkit/ValuationPropertyStep";
import { TextField, SelectField } from "@/components/forms/toolkit/fields";
import ExpertValuationButton from "@/components/forms/expert-valuation/ExpertValuationButton";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import type { SubmitState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FormValues {
  buyOrRent: "buy" | "rent";
  postcode: string;
  /** One-line address, set when the visitor picks one from the address finder. */
  address?: string;
  houseNumber: string;
  houseName: string;
  apartment: string;
  street: string;
  dependantStreet: string;
  bedrooms: string;
  propertyType: string;
  fullName: string;
  email: string;
  telephone: string;
}

/** What the valuation service sends back; its amounts arrive with an HTML "&pound;". */
interface Estimate {
  minvaluation?: string;
  maxvaluation?: string;
  valuation?: string;
}

const pounds = (text: string | undefined) => text?.replace("&pound;", "£");

// These wordings are the ones the valuation service recognises.
const PROPERTY_TYPES = [
  "Semi Detached House",
  "Detached House",
  "Terraced House",
  "Semi Detached Bungalow",
  "Detached Bungalow",
  "Flat",
];

interface Props {
  setIsOpen: (open: boolean) => void;
}

export default function Form({ setIsOpen }: Props) {
  const steps = 3;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: { buyOrRent: "buy" },
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (currentStep !== steps - 1) return;
    setSubmitState("loading");
    try {
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/instantvaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // The enquiry is stored either way (see FormService): a 502 just means
      // the third-party valuation lookup itself failed, not the submission.
      if (res.ok) {
        const json = await res.json();
        setEstimate(json.data?.valuation ?? null);
      } else if (res.status !== 502) {
        throw new Error("Request failed");
      }
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
            <div
              className={cn(
                "flex w-full flex-col items-center gap-5",
                currentStep !== steps && "md:w-max",
              )}
            >
              <StepPanel step={0} currentStep={currentStep}>
                <ValuationPropertyStep />
              </StepPanel>

              <StepPanel step={1} currentStep={currentStep}>
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Property details</SectionHeader>
                  <Copy size="lg">Please fill out all of the fields below.</Copy>
                </div>
                <FieldGrid>
                  <ValuationAddressFields />
                  <SelectField
                    name="bedrooms"
                    label="No of bedrooms"
                    placeholder="-"
                    options={["Studio", "1", "2", "3", "4", "5", "6", "6+"]}
                    colSpanFull
                    required
                  />
                  <SelectField
                    name="propertyType"
                    label="Property type"
                    placeholder="–"
                    options={PROPERTY_TYPES}
                    colSpanFull
                    required
                  />
                </FieldGrid>
              </StepPanel>

              <StepPanel step={2} currentStep={currentStep}>
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Contact details</SectionHeader>
                  <Copy size="lg">Please fill out all of the fields below.</Copy>
                </div>
                <FieldGrid>
                  <TextField name="fullName" label="Full Name" placeholder="Full name*" hideLabel colSpanFull required />
                  <TextField name="email" label="Email" placeholder="Email address*" hideLabel colSpanFull required type="email" />
                  <TextField name="telephone" label="Telephone" placeholder="Telephone*" hideLabel colSpanFull required type="tel" />
                </FieldGrid>
              </StepPanel>

              <StepPanel step={3} currentStep={currentStep} className="">
                {estimate?.minvaluation && estimate.maxvaluation ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="mx-auto flex w-full max-w-[45rem] flex-col items-center gap-6">
                      <div className="flex w-full flex-col items-center justify-center gap-5 self-stretch rounded-big bg-secondary-100 px-3 py-20 text-primary-100">
                        <Copy size="lg">Estimated Range</Copy>
                        <SectionHeader as="p">{`${pounds(estimate.minvaluation)} — ${pounds(estimate.maxvaluation)}`}</SectionHeader>
                        <Copy size="lg">{`Predicted value = ${pounds(estimate.valuation)}`}</Copy>
                      </div>
                      <div className="flex w-full flex-col items-center gap-5 rounded-big bg-white px-3 py-11 text-primary-100">
                        <Copy size="lg" className="max-w-[28rem] text-center">
                          Ready to arrange for one of our experts to visit your home and provide a free
                          valuation?
                        </Copy>
                        <ExpertValuationButton variant="primary" size="lg">
                          Expert Valuation
                        </ExpertValuationButton>
                      </div>
                      <Copy size="lg" className="max-w-[28rem] text-center" textColor="text-white">
                        One of our experts will contact you shortly. Can’t wait? Call us on{" "}
                        <a className="font-bold" href="tel:01256781300">
                          01256 781300
                        </a>
                      </Copy>
                    </div>
                    <SuccessCornerClose onClose={() => setIsOpen(false)} />
                  </div>
                ) : (
                  <SuccessStep
                    heading="Thank you for your enquiry."
                    message="We've received your details and one of our valuation experts will follow up with an accurate estimate shortly."
                    messageClassName="max-w-lg"
                    onClose={() => setIsOpen(false)}
                  />
                )}
              </StepPanel>

              {currentStep !== steps && (
                <StepButtons
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  submitText="Instant valuation"
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
