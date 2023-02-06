import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";
import SelectInput from "../ReactHook/SelectInput";
import { generatePriceOptions } from "../../../utils";
import { Controller, useFormContext } from "react-hook-form";
import BuyRentToggle from "../ReactHook/BuyRentToggle";

export default function FormStep1() {
  const { control, watch } = useFormContext();
  const buyOrRent = watch("buyOrRent");

  const priceOptions =
    buyOrRent === "buy"
      ? generatePriceOptions(0, 2000000, 25000)
      : generatePriceOptions(0, 4000, 100);

  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Search Criteria</SectionHeader>
        <Copy size="lg">
          Provide your contact details so we can get in touch
        </Copy>
      </div>
      <InputsWrapper>
        <Controller
          render={({ field: { value, onChange, name } }) => (
            <BuyRentToggle
              updateSelectOnChange
              onChange={onChange}
              value={value}
              name={name}
              variant="secondary"
              colSpanFull
            />
          )}
          name="buyOrRent"
          control={control}
          defaultValue={"buy"}
        />
        <SelectInput
          name="minPrice"
          label="Min price"
          placeholder="–"
          options={priceOptions}
        />
        <SelectInput
          name="maxPrice"
          label="Max price"
          placeholder="–"
          options={priceOptions}
        />
        <SelectInput
          name="minBedrooms"
          label="Min bedrooms"
          placeholder="–"
          options={[1, 2, 3, 4, 5, 6]}
          colSpanFull
        />
        <SelectInput
          name="radius"
          label="Radius"
          placeholder="This area only"
          options={[1, 2, 5, 10, 15, 20]}
        />
        <SelectInput
          name="propertyType"
          label="Property type"
          placeholder="–"
          options={["House", "Apartment", "Bungalow", "Commerical"]}
        />
        <TextInput
          name="location"
          label="Location"
          placeholder="Enter a town/postcode/street name…"
          colSpanFull
        />
      </InputsWrapper>
    </>
  );
}
