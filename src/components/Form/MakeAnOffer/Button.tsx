import { useState } from "react";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";
import GeneralButton from "../../General/Button";

interface Props {
  children: string;
  address: string;
  buyOrRent: "buy" | "rent";
  variant?:
    | "primary"
    | "secondary"
    | "white"
    | "transparent-white"
    | "transparent-blue";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  address,
  buyOrRent,
  variant = "primary",
  size,
  type = "button",
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GeneralButton
        onClick={() => setIsOpen(true)}
        {...{ variant, size, type, className }}
      >
        {children}
      </GeneralButton>
      <FormModal
        {...{ isOpen, setIsOpen }}
        label="Make an offer"
        heading={{ text: "Ready to make an offer?", width: "max-w-[28rem]" }}
        copy={{
          text: "Thank you for your interest in our property. If you're ready to make an offer, this form provides a quick and easy way to submit your proposal to us. Please fill in the following details and we'll get back to you as soon as possible to discuss your offer further.",
          width: "max-w-md",
        }}
      >
        <Form {...{ setIsOpen, address, buyOrRent }} />
      </FormModal>
    </>
  );
}
