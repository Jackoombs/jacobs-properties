import SectionSubHeader from "./Text/SectionSubHeader";
import { FiArrowRight } from "react-icons/fi/index.js";
import { motion } from "framer-motion";
import { useState } from "react";
import FormModal from "../Form/ReactHook/FormModal";
import InstantForm from "../Form/InstantValuation/Form";
import ExpertForm from "../Form/ExpertValuation/Form";
import clsx from "clsx";

interface Props {
  className?: string;
  children: string;
  backgroundColor: "bg-white" | "bg-primary-100" | "bg-secondary-100";
  valuationType: "instant" | "expert";
}

export default function ValuationLink({
  children,
  backgroundColor,
  className,
  valuationType,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {" "}
      <button
        className={clsx("w-full rounded-big text-primary-100", backgroundColor)}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex flex-col items-start justify-between gap-3 p-6 md:flex-row md:items-center lg:px-12 lg:py-16 xl:py-20">
          <SectionSubHeader className={className} size="lg">
            {children}
          </SectionSubHeader>
          <motion.div
            className="relative md:left-[10px]"
            animate={{ x: isHover ? 10 : 0 }}
          >
            <FiArrowRight className="text-5xl lg:text-6xl" />
          </motion.div>
        </div>
      </button>
      {valuationType === "instant" && (
        <FormModal
          {...{ isOpen, setIsOpen }}
          label="Instant valuation"
          heading={{ text: "Quick and easy valuation", width: "max-w-[34rem]" }}
          copy={{
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
            width: "max-w-md",
          }}
        >
          <InstantForm {...{ setIsOpen }} />
        </FormModal>
      )}
      {valuationType === "expert" && (
        <FormModal
          {...{ isOpen, setIsOpen }}
          label="Book a viewing"
          heading={{ text: "Face to face Valuation", width: "max-w-[34rem]" }}
          copy={{
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut.",
            width: "max-w-md",
          }}
        >
          <ExpertForm {...{ setIsOpen }} />
        </FormModal>
      )}
    </>
  );
}
