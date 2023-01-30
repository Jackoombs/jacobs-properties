import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl";

interface Props {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScreenModal({ isOpen, setIsOpen, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, x: 400 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            x: 400,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          className="fixed top-0 z-[100] grid h-screen w-screen grid-cols-2 bg-red-200"
        >
          {children}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-9 top-9 z-[101] p-4 text-primary-100 md:inline"
          >
            <SlClose className="text-3xl " />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
