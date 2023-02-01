import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";

export default function FormStep1() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Submit an offer</SectionHeader>
        <Copy size="lg">
          Provide your contact details so we can get in touch.
        </Copy>
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
      </InputsWrapper>
    </>
  );
}
