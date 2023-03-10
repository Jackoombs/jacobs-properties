import { useState } from "react";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";
import GeneralButton from "../../General/Button";

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

export default function Button({
  children,
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
        label="Early bird offers"
        heading={{
          text: "Register with us for property alerts",
          width: "max-w-[34rem]",
        }}
        copy={{
          text: "Be first to hear about the properties we have coming to the market. Help us match you to your dream home by filling in our quick and easy form.",
          width: "max-w-md",
        }}
      >
        <Form {...{ setIsOpen }} />
      </FormModal>
    </>
  );
}
