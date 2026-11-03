import { useState } from "react";
import Button from "@/components/common/Button";
import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  children: React.ReactNode;
  price: number;
  address: string;
  buyOrRent: "buy" | "rent";
  propertyId?: string;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function BookAViewingButton({
  children,
  price,
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
        label="Book a viewing"
        heading={{ text: "Take a Closer look", width: "max-w-[24rem]" }}
        copy={{
          text: "We're glad you like the look of this property! Simply fill in the form with your preferred dates and times, and we'll get back to you as soon as possible to confirm your appointment.",
          width: "max-w-md",
        }}
      >
        <Form
          price={price}
          address={address}
          buyOrRent={buyOrRent}
          propertyId={propertyId}
          setIsOpen={setIsOpen}
        />
      </FormSheet>
    </>
  );
}
