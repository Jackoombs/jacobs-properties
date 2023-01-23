import type React from "react";
import { IoMdChatbubbles } from "react-icons/io/index.js";
import { FaChevronDown } from "react-icons/fa/index.js";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface Props {
  question: string;
  answer: string;
  index: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  bgColor?: string;
}

export default function FAQCard({
  question,
  answer,
  index,
  currentIndex,
  setCurrentIndex,
  bgColor = "bg-white",
}: Props) {
  const handleClick = () => {
    setCurrentIndex(index === currentIndex ? -1 : index);
  };

  return (
    <li
      onClick={handleClick}
      className={clsx(
        "w-full max-w-4xl rounded-[5px] py-8 px-6 md:px-9",
        bgColor
      )}
    >
      <motion.button
        initial={false}
        transition={{ layout: { duration: 1, type: "spring" } }}
        animate={{
          gap: currentIndex === index ? "1.2rem" : 0,
          transition: { duration: 0.4 },
        }}
        className="flex w-full flex-col gap-4 text-left"
      >
        <div className="flex items-center justify-between gap-8 lg:gap-14">
          <div>
            <IoMdChatbubbles className="text-xl text-secondary-100 lg:text-[2.5rem]" />
          </div>
          <h3 className="w-full flex-1 text-lg font-medium text-primary-400 lg:text-[1.75rem]">
            {question}
          </h3>
          <motion.div
            animate={{
              rotateX: currentIndex === index ? "-180deg" : "0deg",
              transition: { duration: 0.4 },
            }}
          >
            <FaChevronDown className="text-2xl text-secondary-100" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {currentIndex === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { duration: 0.4 },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.4, opacity: { duration: 0.15 } },
              }}
              className="row-start-2 text-base text-primary-100 lg:pl-[calc(3.5rem+2.5rem)] lg:pr-[calc(3.5rem+1.5rem)]"
            >
              {answer}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
    </li>
  );
}
