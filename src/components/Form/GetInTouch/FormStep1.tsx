import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";
import SelectInput from "../ReactHook/SelectInput";
import { generatePriceOptions } from "../../../utils";
import { Controller, useFormContext } from "react-hook-form";
import BuyRentToggle from "../ReactHook/BuyRentToggle";
import TextAreaInput from "../ReactHook/TextAreaInput";

export default function FormStage1() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">
          Fill out the form below
        </SectionHeader>
      </div>
      <InputsWrapper>
        <TextInput
          name="fullName"
          label="Full Name"
          placeholder="Full name*"
          hideLabel
          colSpanFull
          required
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="Email address*"
          hideLabel
          colSpanFull
          required
          type="email"
        />
        <TextInput
          name="telephone"
          label="Telephone"
          placeholder="Telephone"
          hideLabel
          colSpanFull
          type="tel"
        />
        <TextAreaInput
          name="message"
          label="Message"
          placeholder="Type your message..."
          colSpanFull
          hideLabel
        />
      </InputsWrapper>
    </>
  );
}
