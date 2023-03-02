import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl/index.js";
import LogoBlue from "../../assets/images/header/logo_blue.svg";
import LogoGreen from "../../assets/images/header/logo_green.svg";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  variant?: "primary-100" | "primary-200";
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function ScreenModal({
  variant = "primary-100",
  isOpen,
  setIsOpen,
  children,
  className,
}: Props) {
  const [body, setBody] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setBody(document.body);
  }, []);

  useEffect(() => {
    if (isOpen && body) {
      body.style.overflowY = "hidden";
    } else if (!isOpen && body) {
      body.style.overflowY = "visible";
    }
  }, [isOpen]);

  return (
    <>
      {body &&
        createPortal(
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
                className={clsx(
                  "fixed top-0 left-0 z-[100] h-full min-h-[100svh] w-screen overflow-y-auto",
                  variant === "primary-100" &&
                    "bg-primary-100 text-primary-200",
                  variant === "primary-200" &&
                    "bg-primary-200 text-primary-100",
                  className
                )}
              >
                <div
                  className={clsx(
                    "py-4 lg:hidden",
                    variant === "primary-100" &&
                      "bg-primary-100 text-primary-200",
                    variant === "primary-200" && "bg-white text-primary-100"
                  )}
                >
                  <div className="mx-auto flex w-full max-w-container-lg justify-between">
                    <img
                      className="h-auto w-[9rem]"
                      src={variant === "primary-100" ? LogoGreen : LogoBlue}
                      alt="Jacobs Properties Logo"
                    />
                    <button onClick={() => setIsOpen(false)} className="p-4">
                      <SlClose className="text-3xl " />
                    </button>
                  </div>
                </div>
                {children}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-9 top-9 z-[101] hidden p-4 lg:inline"
                >
                  <SlClose className="text-3xl " />
                </button>
              </motion.aside>
            )}
          </AnimatePresence>,
          body
        )}
    </>
  );
}
