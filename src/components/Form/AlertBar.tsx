import { SlClose } from "react-icons/sl/index.js";
import FormModal from "./ReactHook/FormModal";
import Form from "./EarlyBird/Form";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function AlertBar() {
  const [showBar, setShowBar] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "top-0 left-0 flex h-10 w-full origin-top items-center overflow-hidden bg-secondary-100 text-primary-100 duration-300 md:absolute",
          showBar ? "max-h-10" : "max-h-0"
        )}
      >
        <div className="mx-auto flex w-full max-w-container-lg items-center justify-between">
          <div className="base flex gap-1">
            <p className="hidden md:block">
              Want to see our latest properties before anyone else?{" "}
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="font-semibold underline underline-offset-4"
            >
              Register for property alerts today
            </button>
          </div>
          <button onClick={() => setShowBar(false)}>
            <SlClose className="text-2xl" />
          </button>
        </div>
      </div>
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
      <div className="pb-10 md:pb-0" />
    </>
  );
}
