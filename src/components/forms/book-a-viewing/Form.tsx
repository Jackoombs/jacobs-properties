import { useEffect, useState } from "react";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
import MultiStepForm from "@/components/forms/toolkit/MultiStepForm";
import StepPanel from "@/components/forms/toolkit/StepPanel";
import StepButtons from "@/components/forms/toolkit/StepButtons";
import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import SuccessStep from "@/components/forms/toolkit/SuccessStep";
import { DateField, DayPeriodField, TextField, FieldError } from "@/components/forms/toolkit/fields";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import { formatDates, priceNumberToPriceString } from "@/lib/property-utils";
import type { SubmitState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DateEntry {
  date: Date | "";
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

interface FormValues {
  dates: DateEntry[];
  address: string;
  buyOrRent: "buy" | "rent";
  fullName: string;
  email: string;
  telephone: string;
}

interface Props {
  price: number;
  address: string;
  buyOrRent: "buy" | "rent";
  propertyId?: string;
  setIsOpen: (open: boolean) => void;
}

export default function Form({ price, address, buyOrRent, propertyId, setIsOpen }: Props) {
  const steps = 2;
  const [currentStep, setCurrentStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("default");

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      dates: [{ date: "", morning: true, afternoon: false, evening: false }],
      address,
      buyOrRent,
    },
  });
  const { handleSubmit, control, watch, reset } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "dates" });
  const dates = watch("dates");

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (currentStep !== steps - 1) return;
    setSubmitState("loading");
    try {
      const formattedData = formatDates(data as unknown as Parameters<typeof formatDates>[0]);
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + "api/forms/bookaviewing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formattedData, propertyId }),
      });
      if (!res.ok) throw new Error("Request failed");
      setCurrentStep((curr) => curr + 1);
    } catch (err) {
      setSubmitState("error");
    }
  };

  const priceString = priceNumberToPriceString(price);

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
              <StepPanel step={0} currentStep={currentStep} className="md:min-w-[32rem]">
                <div className="text-center">
                  <SectionHeader className="w-full pb-3">Book a viewing</SectionHeader>
                  <Copy size="lg">
                    <strong>{priceString}</strong> - {address}
                  </Copy>
                </div>
                <FieldGrid>
                  {fields.map((field, index) => (
                    <div
                      className="col-span-full flex grid-cols-2 flex-col gap-2 md:grid"
                      key={field.id}
                    >
                      <DateField
                        name={`dates.${index}.date`}
                        label="Date"
                        hideLabel={index !== 0}
                      />
                      <DayPeriodField index={index} hideLabel={index !== 0} />
                    </div>
                  ))}
                  <div>
                    <FieldError name="dates" />
                    {dates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(dates.length - 1)}
                        className="flex w-max items-center gap-2 text-sm font-normal text-primary-100 underline-offset-4 hover:underline"
                      >
                        <Minus className="mb-1 size-6 text-secondary-100" /> Remove additional
                        date
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        append({ date: "", morning: true, afternoon: false, evening: false })
                      }
                      className="flex w-max items-center gap-2 text-sm font-normal text-primary-100 underline-offset-4 hover:underline"
                    >
                      <Plus className="mb-1 size-6 text-secondary-100" /> Add additional date
                    </button>
                  </div>
                </FieldGrid>
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
                  heading="Thank you for your viewing request."
                  message="We have received your request and will be in touch soon to confirm the details. If you have any urgent questions or changes to your schedule, please don't hesitate to contact us directly. We look forward to showing you the property."
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
                  submitText="Book a viewing"
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
