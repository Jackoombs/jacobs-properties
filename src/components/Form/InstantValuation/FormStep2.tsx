import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";
import SelectInput from "../ReactHook/SelectInput";

export default function FormStep2() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Property details</SectionHeader>
        <Copy size="lg">Please fill out all of the fields below.</Copy>
      </div>
      <InputsWrapper>
        <TextInput
          name="houseNumber"
          label="Building/House number"
          placeholder=""
          isReadonly
        />
        <TextInput
          name="houseName"
          label="Building Name"
          placeholder=""
          isReadonly
        />
        <TextInput
          name="apartment"
          label="Apartment / Building"
          placeholder=""
          isReadonly
        />
        <TextInput
          name="street"
          label="Street Name"
          placeholder=""
          isReadonly
        />
        <TextInput
          name="dependantStreet"
          label="Dependent Street"
          placeholder=""
          isReadonly
        />
        <TextInput name="postcode" label="Postcode" placeholder="" isReadonly />
        <SelectInput
          name="bedrooms"
          label="No of bedrooms"
          placeholder="-"
          options={["Studio", "1", "2", "3", "4", "5", "6", "6+"]}
          colSpanFull
          required
        />
        <SelectInput
          name="propertyType"
          label="Property type"
          placeholder="–"
          options={[
            "Semi Detached House",
            "Detached House",
            "Terraced House",
            "Semi Detached Bungalow",
            "Detached Bungalow",
            "Flat",
          ]}
          colSpanFull
          required
        />
      </InputsWrapper>
    </>
  );
}
