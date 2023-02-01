import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";

export default function Button() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-max md:min-w-[13rem]"
        )}
      >
        Get In Touch Form
      </button>
      <FormModal
        {...{ isOpen, setIsOpen }}
        label="Get in touch"
        heading={{ text: "How can we help you?", width: "max-w-[24rem]" }}
        copy={{
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
          width: "max-w-md",
        }}
      >
        <Form />
      </FormModal>
    </>
  );
}
