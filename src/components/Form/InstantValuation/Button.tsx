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
        label="Instant valuation"
        heading={{ text: "Quick and easy valuation", width: "max-w-[34rem]" }}
        copy={{
          text: "Are you curious about the value of your property? Look no further than our online property valuation tool. With just a few clicks, you can receive a fast and easy estimate of your property's worth.",
          width: "max-w-md",
        }}
      >
        <Form {...{ setIsOpen }} />
      </FormModal>
    </>
  );
}
