import { useState } from "react";
import Button from "@/components/common/Button";
import InstantValuationSheet from "./InstantValuationSheet";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function InstantValuationButton({
  children,
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
      <InstantValuationSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
