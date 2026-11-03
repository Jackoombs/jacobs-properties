import { useState } from "react";
import Button from "@/components/common/Button";
import ExpertValuationSheet from "./ExpertValuationSheet";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

export default function ExpertValuationButton({
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
      <ExpertValuationSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
