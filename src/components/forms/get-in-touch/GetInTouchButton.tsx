import { useState } from "react";
import Button from "@/components/common/Button";
import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  children: React.ReactNode;
  propertyId?: string;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function GetInTouchButton({
  children,
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
        label="Get in touch"
        heading={{ text: "How can we help you?", width: "max-w-[24rem]" }}
        copy={{
          text: "Do you have a question? Need some information? Want to book a valuation or viewing? Whatever your query just fill in the quick and easy form and we will get back to you before you know it. Alternatively call us on 01256 781300.",
          width: "max-w-md",
        }}
      >
        <Form propertyId={propertyId} setIsOpen={setIsOpen} />
      </FormSheet>
    </>
  );
}
