import { useState } from "react";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";
import GeneralButton from "../../General/Button";

interface Props {
  children: string;
  price: string;
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
  price,
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
        label="Book a viewing"
        heading={{ text: "Take a Closer look", width: "max-w-[24rem]" }}
        copy={{
          text: "We're glad you like the look of this property! Simply fill in the form with your preferred dates and times, and we'll get back to you as soon as possible to confirm your appointment.",
          width: "max-w-md",
        }}
      >
        <Form {...{ price, address, setIsOpen, buyOrRent }} />
      </FormModal>
    </>
  );
}
