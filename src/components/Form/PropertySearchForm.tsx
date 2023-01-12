import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa/index.js";
import { IoIosSearch } from "react-icons/io/index.js";
import BuyRentToggle from "./BuyRentToggle";
import React, { useEffect, useState } from "react";
import PropertySearchBar from "./PropertySearchBar";
import clsx from "clsx";
import PropertySearchMenu from "./PropertySearchMenu";
import type { SearchData } from "./PropertySearch";

interface Props {
  setData: React.Dispatch<React.SetStateAction<SearchData | undefined>>;
}

export default function PropertySearchForm({ setData }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBuyRent, setIsBuyRent] = useState(false);
  const [location, setLocation] = useState("");
  const [minBeds, setMinBeds] = useState<"Min Beds" | number>("Min Beds");
  const [minPrice, setMinPrice] = useState("Min Price");
  const [maxPrice, setMaxPrice] = useState("Max Price");
  const [propertyType, setPropertyType] = useState<
    "House" | "Apartment" | "Bungalow" | "Commerical" | "Property Type"
  >("Property Type");
  const [excludeSoldOffer, setExcludeSoldOffer] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (typeof data === "string") {
      const {
        isBuyRent,
        menuOpen,
        location,
        minBeds,
        minPrice,
        maxPrice,
        propertyType,
        excludeSoldOffer,
      } = JSON.parse(data);
      setIsBuyRent(isBuyRent);
      setMenuOpen(menuOpen);
      setLocation(location);
      setMinBeds(minBeds);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setPropertyType(propertyType);
      setExcludeSoldOffer(excludeSoldOffer);
    }
  }, []);

  const getNumber = (formattedNumber: string): number | undefined => {
    const unformattedNumber = formattedNumber
      .replace(/\([^\)]*\)/, "")
      .replace(/[^\d.]/g, "");
    if (Number.isNaN(unformattedNumber)) {
      return undefined;
    } else {
      return +unformattedNumber;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      isBuyRent,
      location: location ? location : undefined,
      minBeds: minBeds !== "Min Beds" ? minBeds : undefined,
      minPrice: getNumber(minPrice),
      maxPrice: getNumber(maxPrice),
      propertyType: propertyType !== "Property Type" ? propertyType : undefined,
      excludeSoldOffer,
    };
    localStorage.setItem("data", JSON.stringify(data));
    setData(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="justify-center-center flex w-full flex-col gap-4 lg:grid lg:w-max lg:grid-cols-2 lg:gap-2 xl:grid-cols-[repeat(4,auto)]"
    >
      <BuyRentToggle
        name="isBuyRent"
        state={isBuyRent}
        setState={setIsBuyRent}
      />
      <PropertySearchBar
        name="searchBar"
        state={location}
        setState={setLocation}
      />

      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setMenuOpen((state) => !state)}
          className="relative flex h-[3.5rem] w-full min-w-[15rem] items-center justify-center gap-2 rounded-big bg-primary-200 px-3 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 lg:h-[4.625rem]"
        >
          Advanced Search{" "}
          <motion.div
            animate={{
              rotateX: menuOpen ? "-180deg" : "0deg",
              transition: { duration: 0.4 },
            }}
          >
            <FaChevronDown className="" />
          </motion.div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "2.5rem" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg-visible absolute -bottom-6 z-50 hidden h-10 w-full bg-primary-200 lg:block"
              ></motion.div>
            )}
          </AnimatePresence>
        </button>
        <PropertySearchMenu
          addClasses="lg:hidden"
          {...{
            menuOpen,
            minBeds,
            setMinBeds,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            propertyType,
            setPropertyType,
            excludeSoldOffer,
            setExcludeSoldOffer,
          }}
        />
      </div>

      <button
        type="submit"
        className={clsx(
          "flex h-[3.5rem] w-full min-w-[10rem] items-center justify-center gap-2 rounded-big bg-secondary-100 px-3 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 lg:h-[4.625rem]"
        )}
      >
        Search <IoIosSearch className="text-xl" />
      </button>
      <div className="col-span-full hidden lg:block">
        <PropertySearchMenu
          {...{
            menuOpen,
            minBeds,
            setMinBeds,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            propertyType,
            setPropertyType,
            excludeSoldOffer,
            setExcludeSoldOffer,
          }}
        />
      </div>
    </form>
  );
}
