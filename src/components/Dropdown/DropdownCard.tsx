import { MdOutlineAdd } from "react-icons/md/index.js";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  question: string;
  answer: string;
  index: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function DropdownCard({
  question,
  answer,
  index,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const handleClick = () => {
    setCurrentIndex(index === currentIndex ? -1 : index);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      transition={{ layout: { duration: 1, type: "spring" } }}
      animate={{
        gap: currentIndex === index ? "1.2rem" : 0,
        transition: { duration: 0.4 },
      }}
      className="relative flex w-full max-w-4xl flex-col gap-4 rounded-big bg-primary-200 py-8 px-2 text-left md:px-9"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <h3 className="w-full flex-1 text-lg font-semibold leading-[1.25] text-primary-400 lg:text-[1.5rem] xl:text-[2rem]">
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: currentIndex === index ? "-45deg" : "0deg",
            transition: { duration: 0.4 },
          }}
        >
          <MdOutlineAdd className="text-2xl text-secondary-100" />
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
            className="text-[0.875rem] font-normal leading-[1.5] text-primary-100 lg:text-[1.375rem]"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
