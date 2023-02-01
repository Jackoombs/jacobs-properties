import TextInput from "../ReactHook/TextInput";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";
import TextAreaInput from "../ReactHook/TextAreaInput";

export default function FormStage1() {
  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Submit an offer</SectionHeader>
        <Copy size="lg">Make your offer below and leave any details.</Copy>
      </div>
      <InputsWrapper>
        <TextInput
          name="offer"
          label="My offer*"
          placeholder="E.g. 500000"
          type="text"
          isNumber
          colSpanFull
          required
        />
        <TextAreaInput
          name="message"
          label="Your requirements"
          placeholder="Message..."
          rows={6}
          colSpanFull
        />
      </InputsWrapper>
    </>
  );
}
