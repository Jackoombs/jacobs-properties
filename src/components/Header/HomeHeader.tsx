import LogoBlue from "../../assets/images/header/logo_blue.svg";
import LogoGreen from "../../assets/images/header/logo_green.svg";
import Link from "../General/Link";
import MenuBtn from "./MenuBtn";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ContactBtn from "./ContactBtn";

export default function HomeHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const updateIsSticky = () => {
      let scrollPos = window.pageYOffset;

      if (scrollPos > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    updateIsSticky();
    document.addEventListener("scroll", updateIsSticky);

    return () => {
      document.removeEventListener("scroll", updateIsSticky);
    };
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 z-40 flex w-full flex-col items-center leading-[1.1] duration-100",
        isSticky ? "bg-white text-primary-100" : "text-white"
      )}
    >
      {!isSticky && (
        <a
          id="header-target"
          href="/valuation"
          className="flex h-12 w-full items-center justify-center bg-primary-100 duration-100 md:hidden"
        >
          <p className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-white">
            Book a Valuation
          </p>
        </a>
      )}
      <div
        className={clsx(
          "flex w-full max-w-container-lg items-center justify-between text-xs font-semibold uppercase",
          isSticky
            ? "h-[5.625rem] md:lg:h-[7.75rem]"
            : "h-[6.75rem] lg:h-[8rem] 2xl:h-[10.5rem]"
        )}
      >
        <a
          className={clsx("flex items-center self-end", isSticky ? "pb-2" : "")}
          href="/valuation"
        >
          <img
            className={clsx(
              "aspect-[2.1] h-auto object-cover",
              isSticky
                ? "w-[9rem] lg:w-[12rem]"
                : "w-[10.625rem] lg:w-[12rem] 2xl:w-[16.25rem]"
            )}
            src={isSticky ? LogoBlue : LogoGreen}
            alt="Jacobs Properties Logo"
          />
        </a>
        <div className="flex items-center gap-6 2xl:gap-md">
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-6 text-[0.875rem] font-semibold tracking-[1.4px] 2xl:gap-md">
              <li className="hover:text-secondary-100">
                <a
                  className="rounded-big py-3 leading-[1.1] duration-100"
                  href="/buyers"
                >
                  Buyers
                </a>
              </li>
              <li className="hover:text-secondary-100">
                <a
                  className="rounded-big py-3 leading-[1.1] duration-100"
                  href="/sellers"
                >
                  Sellers
                </a>
              </li>
              <li className="hover:text-secondary-100">
                <a
                  className="rounded-big py-3 leading-[1.1] duration-100"
                  href="/landlords"
                >
                  Landlords
                </a>
              </li>
              <li className="hover:text-secondary-100">
                <a
                  className="rounded-big py-3 leading-[1.1] duration-100"
                  href="/tenants"
                >
                  Tenants
                </a>
              </li>
            </ul>
          </nav>
          <div className=" hidden items-center gap-4 md:flex">
            <Link
              link="/property-search"
              type={isSticky ? "transparent-blue" : "transparent-white"}
              size="lg"
            >
              Property Search
            </Link>
            <Link link="/valuation" type="secondary" size="lg">
              Book a valuation
            </Link>
          </div>
          <div
            className={clsx(
              "flex items-center gap-6",
              isSticky ? "text-primary-100" : "text-white"
            )}
          >
            <ContactBtn />
            <MenuBtn color={isSticky ? "primary-100" : "white"} />
          </div>
        </div>
      </div>
    </header>
  );
}
