import LogoBlue from "../../assets/images/logo_blue.png";
import LogoGreen from "../../assets/images/logo_green.png";
import Link from "../General/Link";
import MenuBtn from "./MenuBtn";
import clsx from "clsx";
import { BsTelephoneFill } from "react-icons/bs/index.js";
import { useEffect, useState } from "react";

export default function HomeHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", function () {
      let scrollPos = window.pageYOffset;

      if (scrollPos > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center duration-100",
        isSticky
          ? "max-h-20 bg-white text-primary-100 md:max-h-[6.5rem]"
          : "max-h-44 text-white"
      )}
    >
      {!isSticky && (
        <div className="flex h-11 w-full items-center justify-center bg-primary-100 text-xs font-semibold uppercase text-white xl:hidden">
          Book a Valuation
        </div>
      )}
      <div className="mx-auto my-auto flex w-full max-w-container-lg items-center justify-between text-xs font-semibold uppercase">
        <a className="flex items-center" href="/">
          <img
            className={clsx(
              "h-20 w-auto xl:h-[6.625rem]",
              isSticky && "scale-75"
            )}
            src={isSticky ? LogoBlue.src : LogoGreen.src}
            alt="Jacobs Properties Logo"
          />
        </a>
        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-3 text-[10px] xl:gap-6 xl:text-xs">
              <li>
                <a
                  className="rounded-xl p-2 duration-100 hover:bg-primary-100 hover:text-white"
                  href=""
                >
                  Buyers
                </a>
              </li>
              <li>
                <a
                  className="rounded-xl p-2 duration-100 hover:bg-primary-100 hover:text-white"
                  href=""
                >
                  Sellers
                </a>
              </li>
              <li>
                <a
                  className="rounded-xl p-2 duration-100 hover:bg-primary-100 hover:text-white"
                  href=""
                >
                  Landlords
                </a>
              </li>
              <li>
                <a
                  className="rounded-xl p-2 duration-100 hover:bg-primary-100 hover:text-white"
                  href=""
                >
                  Tenants
                </a>
              </li>
            </ul>
          </nav>
          <div className="hidden items-center gap-3 xl:flex">
            <Link
              link="/"
              text="Property Search"
              type={isSticky ? "transparent-blue" : "transparent-white"}
              size="lg"
            />
            <Link link="/" text="Book a valuation" type="secondary" size="lg" />
          </div>
          <div
            className={clsx(
              "flex items-center gap-3",
              isSticky ? "text-primary-100" : "text-white"
            )}
          >
            <BsTelephoneFill className="scale-x-[-1] text-2xl" />
            <MenuBtn color={isSticky ? "primary-100" : "white"} />
          </div>
        </div>
      </div>
    </header>
  );
}
