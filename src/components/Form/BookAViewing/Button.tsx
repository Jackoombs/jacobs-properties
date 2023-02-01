import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";

interface Props {
  price: string;
  address: string;
}

export default function Button({ price, address }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-max md:min-w-[13rem]"
        )}
      >
        Book a viewing form
      </button>
      <FormModal
        {...{ isOpen, setIsOpen }}
        label="Book a viewing"
        heading={{ text: "Take a Closer look", width: "max-w-[24rem]" }}
        copy={{
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
          width: "max-w-md",
        }}
      >
        <Form {...{ price, address, setIsOpen }} />
      </FormModal>
    </>
  );
}
