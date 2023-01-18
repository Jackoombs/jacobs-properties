import SectionSubHeader from "./Text/SectionSubHeader";
import { FiArrowRight } from "react-icons/fi/index.js";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: string;
  backgroundColor: "bg-white" | "bg-primary-100" | "bg-secondary-100";
  link: string;
}

export default function ValuationLink({
  children,
  backgroundColor,
  link,
  className,
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      className={clsx("w-full rounded-big text-primary-100", backgroundColor)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      href={link}
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
    </a>
  );
}
