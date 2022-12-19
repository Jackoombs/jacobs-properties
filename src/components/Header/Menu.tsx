import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl/index.js";

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ menuOpen, setMenuOpen }: Props) {
  const quickLinks = [
    {
      text: "Find a home",
      link: "/",
    },
    {
      text: "Book a valuation",
      link: "/",
    },
  ];

  const discover = [
    {
      text: "Buyers",
      link: "/",
    },
    {
      text: "Sellers",
      link: "/",
    },
    {
      text: "Landlords",
      link: "/",
    },
    {
      text: "Tenants",
      link: "/",
    },
  ];

  const aboutUs = [
    {
      text: "About us",
      link: "/",
    },
    {
      text: "News",
      link: "/",
    },
    {
      text: "Area guides",
      link: "/",
    },
    {
      text: "Contact us",
      link: "/",
    },
  ];

  return (
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
          <nav className="flex h-auto w-full max-w-container-lg flex-col gap-10 md:flex-row md:items-center md:justify-center md:gap-14">
            <section className="w-full self-start pt-12 md:max-w-xs md:pt-0">
              <div className="flex items-center justify-between pb-7">
                <h3 className="white text-xs font-semibold uppercase tracking-[0.2em]">
                  QuickLinks
                </h3>
                <button onClick={() => setMenuOpen(false)}>
                  <SlClose className="text-3xl text-white md:hidden" />
                </button>
              </div>
              <ul>
                {quickLinks.map(({ text, link }, index, array) => (
                  <li className="flex flex-col justify-between" key={index}>
                    <hr className="border-secondary-100" />
                    <a
                      className="py-4 text-2xl font-medium normal-case md:py-7 md:text-4xl"
                      href={link}
                    >
                      {text}
                    </a>
                    {index === array.length - 1 && (
                      <hr className="border-secondary-100" />
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="w-full md:max-w-xs">
              <h3 className="white pb-7 text-xs font-semibold uppercase tracking-[0.2em]">
                Discover
              </h3>
              <ul>
                {discover.map(({ text, link }, index, array) => (
                  <li className="flex flex-col justify-between" key={index}>
                    <hr className="border-secondary-100" />
                    <a
                      className="py-3 text-xl font-medium normal-case"
                      href={link}
                    >
                      {text}
                    </a>
                    {index === array.length - 1 && (
                      <hr className="border-secondary-100" />
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="w-full pb-12 md:max-w-xs md:pb-0">
              <h3 className="white pb-7 text-xs font-semibold uppercase tracking-[0.2em]">
                About us
              </h3>
              <ul>
                {aboutUs.map(({ text, link }, index, array) => (
                  <li className="flex flex-col justify-between" key={index}>
                    <hr className="border-secondary-100" />
                    <a
                      className="py-3 text-xl font-medium normal-case"
                      href={link}
                    >
                      {text}
                    </a>
                    {index === array.length - 1 && (
                      <hr className="border-secondary-100" />
                    )}
                  </li>
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
    </AnimatePresence>
  );
}
