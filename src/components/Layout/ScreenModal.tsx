import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl/index.js";
import LogoBlue from "../../assets/images/header/logo_blue.svg";

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
          className="fixed top-0 z-[100] h-full min-h-screen w-screen overflow-y-auto bg-primary-200 lg:grid lg:grid-cols-2"
        >
          <div className=" bg-white py-4 lg:hidden">
            <div className="mx-auto flex w-full max-w-container-lg justify-between">
              <img
                className="h-auto w-[9rem]"
                src={LogoBlue}
                alt="Jacobs Properties Logo"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-4 text-primary-100"
              >
                <SlClose className="text-3xl " />
              </button>
            </div>
          </div>
          {children}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-9 top-9 z-[101] hidden p-4 text-primary-100 lg:inline"
          >
            <SlClose className="text-3xl " />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
