import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import FormModal from "../ReactHook/FormModal";

interface Props {
  address: string;
}

export default function Button({ address }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-max md:min-w-[13rem]"
        )}
      >
        Make an offer form
      </button>
      <FormModal
        {...{ isOpen, setIsOpen }}
        label="Make an offer"
        heading={{ text: "Ready to make an offer?", width: "max-w-[28rem]" }}
        copy={{
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
          width: "max-w-md",
        }}
      >
        <Form {...{ address }} />
      </FormModal>
    </>
  );
}
