import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

/** The expert valuation booking form and its side panel, shared by every trigger that opens it. */
export default function ExpertValuationSheet({ isOpen, setIsOpen }: Props) {
  return (
    <FormSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      label="Expert Valuation"
      heading={{ text: "Face to face Valuation", width: "max-w-[34rem]" }}
      copy={{
        text: "If you're considering selling or letting your property, it's important to know its current market value. We will visit your property when it suits you, whether that's during the day, in the evening, or at the weekend. We'll take the time to conduct an in-depth valuation of your property, taking into account its location, size, age, and condition, as well as any recent renovations or upgrades. We'll also consider current market trends and comparable properties in your area to give you an accurate estimate of your property's value.",
        width: "max-w-md",
      }}
    >
      <Form setIsOpen={setIsOpen} />
    </FormSheet>
  );
}
