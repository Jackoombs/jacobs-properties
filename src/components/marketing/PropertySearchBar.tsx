import { useId } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BuyRentToggleField } from "@/components/forms/toolkit/fields";

interface FormValues {
  buyOrRent: "buy" | "rent";
  location: string;
}

interface Props {
  /** Which side of the toggle starts selected. */
  defaultMode?: "buy" | "rent";
}

/**
 * The search box the original put under its "find a property" headings: a
 * buy/rent toggle and a location field. Submitting hands both to the search
 * page, which reads them from session storage on load.
 */
export default function PropertySearchBar({ defaultMode = "buy" }: Props) {
  const inputId = useId();
  const methods = useForm<FormValues>({ defaultValues: { buyOrRent: defaultMode, location: "" } });

  const onSubmit = ({ buyOrRent, location }: FormValues) => {
    window.sessionStorage.setItem("buyOrRent", buyOrRent);
    window.sessionStorage.setItem("location", location);
    window.location.href = "/property-search";
  };

  return (
    <FormProvider {...methods}>
      <form
        role="search"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex w-full max-w-4xl flex-col items-center justify-between gap-4 md:flex-row"
      >
        {/* A flex item with a set width would otherwise shrink to make room for the field. */}
        <div className="shrink-0">
          <BuyRentToggleField name="buyOrRent" size="lg" variant="secondary" />
        </div>
        <div className="relative flex w-full items-center">
          <label htmlFor={inputId} className="sr-only">
            Location
          </label>
          <Input
            id={inputId}
            type="text"
            placeholder="Begin your search by town or postcode… i.e RG21"
            className="h-16 rounded-big border-0 bg-white px-6 font-medium text-primary-100 placeholder:text-primary-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-100 focus-visible:ring-0 md:text-base"
            {...methods.register("location")}
          />
          <button type="submit" aria-label="Search" className="absolute right-0 rounded-full bg-white">
            <Search className="box-content size-6 py-5 pr-5 text-primary-100" />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
