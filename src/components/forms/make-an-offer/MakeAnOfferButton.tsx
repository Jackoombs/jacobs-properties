import { useState } from "react";
import Button from "@/components/common/Button";
import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  children: React.ReactNode;
  address: string;
  buyOrRent: "buy" | "rent";
  propertyId?: string;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function MakeAnOfferButton({
  children,
  address,
  buyOrRent,
  propertyId,
  variant = "primary",
  size,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant={variant} size={size} className={className}>
        {children}
      </Button>
      <FormSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        label="Make an offer"
        heading={{ text: "Ready to make an offer?", width: "max-w-[28rem]" }}
        copy={{
          text: "Thank you for your interest in our property. If you're ready to make an offer, this form provides a quick and easy way to submit your proposal to us. Please fill in the following details and we'll get back to you as soon as possible to discuss your offer further.",
          width: "max-w-md",
        }}
      >
        <Form address={address} buyOrRent={buyOrRent} propertyId={propertyId} setIsOpen={setIsOpen} />
      </FormSheet>
    </>
  );
}
