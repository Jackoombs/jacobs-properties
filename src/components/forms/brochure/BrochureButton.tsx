import { useState } from "react";
import Button from "@/components/common/Button";
import FormSheet from "@/components/forms/toolkit/FormSheet";
import Form from "./Form";

interface Props {
  children: React.ReactNode;
  buyOrRent: "buy" | "rent";
  pdfUrl: string;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function BrochureButton({
  children,
  buyOrRent,
  pdfUrl,
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
        label="Free guide"
        heading={{ text: "Get your free guide", width: "max-w-[24rem]" }}
        copy={{
          text: "Pop in your details and we'll send your download straight away.",
          width: "max-w-md",
        }}
      >
        <Form buyOrRent={buyOrRent} pdfUrl={pdfUrl} setIsOpen={setIsOpen} />
      </FormSheet>
    </>
  );
}
