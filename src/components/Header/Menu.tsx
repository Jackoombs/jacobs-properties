import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl/index.js";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ menuOpen, setMenuOpen }: Props) {
  const [body, setBody] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setBody(document.body);
  }, []);

  const quickLinks = [
    {
      text: "Find a home",
      link: "/property-search",
    },
    {
      text: "Value my home",
      link: "/valuation",
    },
  ];

  const ourServices = [
    {
      text: "Buyers",
      link: "/buyers",
    },
    {
      text: "Sellers",
      link: "/sellers",
    },
    {
      text: "Landlords",
      link: "/landlords",
    },
    {
      text: "Tenants",
      link: "/tenants",
    },
  ];

  const aboutUs = [
    {
      text: "About us",
      link: "/about-us",
    },
    {
      text: "News",
      link: "/news",
    },
    {
      text: "Area guides",
      link: "/area-guides",
    },
    {
      text: "Contact us",
      link: "/contact-us",
    },
  ];

  useEffect(() => {
    if (menuOpen && body) {
      body.style.overflowY = "hidden";
    } else if (!menuOpen && body) {
      body.style.overflowY = "visible";
    }
  }, [menuOpen]);

  return (
    <>
      {body &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
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
                className="fixed top-0 left-0 z-50 flex h-full min-h-screen w-screen justify-center overflow-y-auto bg-primary-100 text-white md:items-center"
              >
                <nav className="flex h-auto w-full max-w-container-lg flex-col gap-4 py-sm md:flex-row md:items-center md:justify-center lg:gap-[3.875rem]">
                  <button
                    className=" self-end md:hidden"
                    onClick={() => setMenuOpen(false)}
                  >
                    <SlClose className="text-2xl text-white" />
                  </button>
                  <section className="w-full self-start pt-8 md:max-w-[23.125rem] md:pt-0">
                    <MenuHeader text="quicklinks" />
                    <ul>
                      {quickLinks.map(({ text, link }, index, array) => (
                        <MenuItem
                          key={index}
                          arrayLength={array.length}
                          size="lg"
                          {...{ index, link }}
                        >
                          {text}
                        </MenuItem>
                      ))}
                    </ul>
                  </section>

                  <section className="w-full md:max-w-[23.125rem]">
                    <MenuHeader text="our services" />
                    <ul>
                      {ourServices.map(({ text, link }, index, array) => (
                        <MenuItem
                          key={index}
                          arrayLength={array.length}
                          size="sm"
                          {...{ index, link }}
                        >
                          {text}
                        </MenuItem>
                      ))}
                    </ul>
                  </section>

                  <section className="w-full pb-12 md:max-w-[23.125rem] md:pb-0">
                    <MenuHeader text="about us" />
                    <ul>
                      {aboutUs.map(({ text, link }, index, array) => (
                        <MenuItem
                          key={index}
                          arrayLength={array.length}
                          size="sm"
                          {...{ index, link }}
                        >
                          {text}
                        </MenuItem>
                      ))}
                    </ul>
                  </section>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute right-[5vw] top-[5vh] order-1 hidden p-4 md:inline"
                  >
                    <SlClose className="text-3xl text-white" />
                  </button>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>,
          body
        )}
    </>
  );
}
