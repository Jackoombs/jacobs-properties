import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

/** The instant valuation form and its side panel, shared by every trigger that opens it. */
export default function InstantValuationSheet({ isOpen, setIsOpen }: Props) {
  return (
    <FormSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      label="Instant valuation"
      heading={{ text: "Quick and easy valuation", width: "max-w-[34rem]" }}
      copy={{
        text: "Are you curious about the value of your property? Look no further than our online property valuation tool. With just a few clicks, you can receive a fast and easy estimate of your property's worth.",
        width: "max-w-md",
      }}
    >
      <Form setIsOpen={setIsOpen} />
    </FormSheet>
  );
}
