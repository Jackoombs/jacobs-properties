import { useState } from "react";
import clsx from "clsx";
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
        label="Expert Valuation"
        heading={{ text: "Face to face Valuation", width: "max-w-[34rem]" }}
        copy={{
          text: "If you're considering selling or letting your property, it's important to know its current market value. We will visit your property when it suits you, whether that's during the day, in the evening, or at the weekend. We'll take the time to conduct an in-depth valuation of your property, taking into account its location, size, age, and condition, as well as any recent renovations or upgrades. We'll also consider current market trends and comparable properties in your area to give you an accurate estimate of your property's value.",
          width: "max-w-md",
        }}
      >
        <Form {...{ setIsOpen }} />
      </FormModal>
    </>
  );
}
