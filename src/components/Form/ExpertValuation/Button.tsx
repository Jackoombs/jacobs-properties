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
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
          width: "max-w-md",
        }}
      >
        <Form {...{ setIsOpen }} />
      </FormModal>
    </>
  );
}
