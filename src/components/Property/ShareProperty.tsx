import { useState } from "react";
import GeneralButton from "../General/Button";
import ScreenModal from "../Layout/ScreenModal";

interface Props {
  children: string;
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

export default function SharePropertyButton({
  children,
  variant = "primary",
  size,
  type = "button",
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <GeneralButton
        onClick={() => setIsOpen(true)}
        {...{ variant, size, type, className }}
      >
        {children}
      </GeneralButton>
      <ScreenModal {...{ isOpen, setIsOpen }}>
        <div>HIyaaaaa</div>
      </ScreenModal>
    </>
  );
}
