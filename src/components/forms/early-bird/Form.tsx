import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepForm from "@/components/forms/toolkit/MultiStepForm";
import StepPanel from "@/components/forms/toolkit/StepPanel";
import StepButtons from "@/components/forms/toolkit/StepButtons";
import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import SuccessStep from "@/components/forms/toolkit/SuccessStep";
import { TextField, SelectField, BuyRentToggleField } from "@/components/forms/toolkit/fields";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import { generatePriceOptions } from "@/lib/property-utils";
import type { SubmitState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormValues {
  buyOrRent: "buy" | "rent";
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  radius: string;
  propertyType: string;
  location: string;
  fullName: string;
  email: string;
  telephone: string;
}

function SearchCriteriaFields() {
  const { watch } = useFormContext<FormValues>();
  const buyOrRent = watch("buyOrRent");
  const priceOptions =
    buyOrRent === "rent" ? generatePriceOptions(0, 4000, 100) : generatePriceOptions(0, 2000000, 25000);

  return (
    <FieldGrid>
      <div className="col-span-full">
        <BuyRentToggleField name="buyOrRent" variant="secondary" />
      </div>
      <SelectField name="minPrice" label="Min price" placeholder="–" options={priceOptions} />
      <SelectField name="maxPrice" label="Max price" placeholder="–" options={priceOptions} />
      <SelectField
        name="minBedrooms"
        label="Min bedrooms"
        placeholder="–"
        options={[1, 2, 3, 4, 5, 6]}
        colSpanFull
      />
      <SelectField
        name="radius"
        label="Radius"
        placeholder="This area only"
        options={[1, 2, 5, 10, 15, 20]}
      />
      <SelectField
        name="propertyType"
        label="Property type"
        placeholder="–"
        options={["House", "Apartment", "Bungalow", "Commercial"]}
      />
      <TextField
        name="location"
        label="Location"
        placeholder="Enter a town/postcode/street name…"
        colSpanFull
      />
    </FieldGrid>
  );
}

export default function Form({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
  const steps = 2;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");

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
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/earlybird", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
                  <SectionHeader className="w-full pb-3">Search Criteria</SectionHeader>
                  <Copy size="lg">Provide your contact details so we can get in touch</Copy>
                </div>
                <SearchCriteriaFields />
              </StepPanel>

              <StepPanel step={1} currentStep={currentStep}>
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Contact details</SectionHeader>
                  <Copy size="lg">Please fill out all of the fields below.</Copy>
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

              <StepPanel step={2} currentStep={currentStep} className="">
                <SuccessStep
                  heading="Thank you for subscribing."
                  message="You will now receive email notifications whenever new properties that match your preferences become available on the market. Thank you for choosing us to help you find your dream property."
                  messageClassName="max-w-lg"
                  onClose={() => setIsOpen(false)}
                />
              </StepPanel>

              {currentStep !== steps && (
                <StepButtons
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  submitText="Register"
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
