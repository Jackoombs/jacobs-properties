import { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  TextField,
  SelectField,
  CheckboxField,
  BuyRentToggleField,
} from "@/components/forms/toolkit/fields";
import { ChevronDownBold } from "@/components/common/FilledIcons";
import { generatePriceOptions, getNumberFromPriceString } from "@/lib/property-utils";
import { cn } from "@/lib/utils";
import type { SearchCriteria } from "./SearchCriteria";

interface FormValues {
  buyOrRent: "buy" | "rent";
  location: string;
  minBeds: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  excludeSold: boolean;
}

function AdvancedSearchFields() {
  const { watch } = useFormContext<FormValues>();
  const buyOrRent = watch("buyOrRent");
  const priceOptions =
    buyOrRent === "rent" ? generatePriceOptions(0, 4000, 100) : generatePriceOptions(0, 2000000, 25000);

  return (
    <div className="box-border rounded-big py-4 lg:bg-primary-200 lg:p-9 lg:px-8">
      <div className="grid grid-cols-2 gap-3 pb-4 xl:grid-cols-4">
        <SelectField
          name="minBeds"
          label="Min Bedrooms"
          placeholder="Min Beds"
          options={Array.from({ length: 11 }, (_, i) => i)}
        />
        <SelectField name="minPrice" label="Min Price" placeholder="Min Price" options={priceOptions} />
        <SelectField name="maxPrice" label="Max Price" placeholder="Max Price" options={priceOptions} />
        <SelectField
          name="propertyType"
          label="Property Type"
          placeholder="Property Type"
          options={["Detached", "Semi-Detached", "Apartment", "Bungalow", "Commercial"]}
        />
      </div>
      <CheckboxField name="excludeSold" label="Exclude sold / under offer" />
    </div>
  );
}

export default function SearchForm({
  setSearchCriteria,
}: {
  setSearchCriteria: (criteria: SearchCriteria) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      buyOrRent: "buy",
      location: "",
      excludeSold: false,
    },
  });
  const { watch, setValue } = methods;

  useEffect(() => {
    const buyOrRent = window.sessionStorage.getItem("buyOrRent");
    const location = window.sessionStorage.getItem("location");
    setValue("buyOrRent", buyOrRent === "rent" ? "rent" : "buy");
    setValue("location", location ?? "");
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((values) => {
      setSearchCriteria({
        buyOrRent: values.buyOrRent === "rent" ? "rent" : "buy",
        location: values.location || undefined,
        minBeds: values.minBeds ? Number(values.minBeds) : undefined,
        minPrice: values.minPrice ? getNumberFromPriceString(values.minPrice) : undefined,
        maxPrice: values.maxPrice ? getNumberFromPriceString(values.maxPrice) : undefined,
        propertyType: values.propertyType || undefined,
        excludeSold: !!values.excludeSold,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setSearchCriteria]);

  return (
    <FormProvider {...methods}>
      <form className="flex w-full max-w-[68rem] flex-col items-center justify-center gap-4 lg:grid lg:grid-cols-2 lg:gap-2 xl:grid-cols-[auto_1fr_auto_auto]">
        <BuyRentToggleField name="buyOrRent" size="sm" />
        <TextField
          name="location"
          label="Location"
          placeholder="Begin your search by town or postcode... i.e RG21"
          hideLabel
        />

        <Collapsible open={menuOpen} onOpenChange={setMenuOpen} className="w-full md:col-span-full xl:col-span-1">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="relative flex h-[3.5rem] w-full min-w-[15rem] items-center justify-center gap-2 rounded-big bg-primary-200 px-3 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 lg:h-[4.625rem]"
            >
              Advanced Search
              <ChevronDownBold
                className={cn("size-3.5 transition-transform duration-400", menuOpen && "rotate-x-180")}
              />
              {/* Joins the button to the panel below it, like a tab, on wide screens. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-6 z-50 hidden w-full bg-primary-200 transition-[height] duration-400 ease-in-out lg:block",
                  menuOpen ? "h-10" : "h-0",
                )}
              />
            </button>
          </CollapsibleTrigger>
        </Collapsible>

        <Collapsible open={menuOpen} onOpenChange={setMenuOpen} className="col-span-full w-full">
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <AdvancedSearchFields />
          </CollapsibleContent>
        </Collapsible>
      </form>
    </FormProvider>
  );
}
