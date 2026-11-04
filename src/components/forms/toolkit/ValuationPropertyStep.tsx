import FieldGrid from "@/components/forms/toolkit/FieldGrid";
import { BuyRentToggleField, POSTCODE_PATTERN, TextField } from "@/components/forms/toolkit/fields";
import PostcodeAddressLookup from "@/components/forms/toolkit/PostcodeAddressLookup";
import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";

/** The first step of both valuation forms: selling or renting, and where the property is. */
export default function ValuationPropertyStep() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Your property</SectionHeader>
        <Copy size="lg">Select your valuation type and find your property.</Copy>
      </div>
      <FieldGrid>
        <div className="col-span-full max-w-[20rem] justify-self-center">
          <BuyRentToggleField
            name="buyOrRent"
            variant="secondary"
            buyLabel="selling"
            rentLabel="renting"
          />
        </div>
        <PostcodeAddressLookup />
      </FieldGrid>
    </>
  );
}

/**
 * The address parts the valuation service uses. Filled in by the address
 * finder on the first step when the visitor picks an address, and left
 * editable so they can correct it or type it in when the lookup can't help.
 * Shown on both valuation forms' "Property details" step, above the bedrooms
 * and property type fields.
 */
export function ValuationAddressFields() {
  return (
    <>
      <TextField name="houseNumber" label="Building/House number" placeholder="" />
      <TextField name="houseName" label="Building Name" placeholder="" />
      <TextField name="apartment" label="Apartment / Building" placeholder="" />
      <TextField name="street" label="Street Name" placeholder="" />
      <TextField name="dependantStreet" label="Dependent Street" placeholder="" />
      {/* Same field as on the first step, so it carries the same rules (the last registration wins). */}
      <TextField
        name="postcode"
        id="postcode-details"
        label="Postcode"
        placeholder=""
        required
        pattern={{ value: POSTCODE_PATTERN, message: "Please enter a valid postcode" }}
      />
    </>
  );
}
