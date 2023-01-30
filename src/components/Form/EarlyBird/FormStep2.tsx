import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";

export default function FormStage1() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Contact details</SectionHeader>
        <Copy size="lg">Please fill out all of the fields below.</Copy>
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
