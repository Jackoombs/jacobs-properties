import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa/index.js";
import { IoIosSearch } from "react-icons/io/index.js";
import BuyRentToggle from "../Form/ReactHook/BuyRentToggle";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropertySearchMenu from "./PropertySearchMenu";
import type { SearchCriteria } from "./PropertySearch";
import { useForm, FormProvider, Controller } from "react-hook-form";
import TextInput from "../Form/ReactHook/TextInput";
import { getNumberFromPriceString } from "../../utils";

interface Props {
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
}

interface SearchData {
  buyOrRent: "buy" | "rent";
  location: string;
  minBeds: number;
  minPrice: string;
  maxPrice: string;
  propertyType:
    | "Detached"
    | "Semi-Detached"
    | "Apartment"
    | "Bungalow"
    | "Commerical";
}

export default function PropertySearchForm({ setSearchCriteria }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const methods = useForm();
  const { watch, control, handleSubmit, setValue } = methods;

  useEffect(() => {
    const buyOrRent: string | null = window.sessionStorage.getItem("buyOrRent");
    const location: string | null = window.sessionStorage.getItem("location");
    setValue("buyOrRent", buyOrRent ? buyOrRent : "buy");
    setValue("location", location ? location : "");
  }, []);

  const onSubmit = (data: any) => {
    const {
      buyOrRent,
      location,
      minBeds,
      minPrice,
      maxPrice,
      propertyType,
      excludeSold,
    } = data;
    setSearchCriteria({
      buyOrRent,
      location: location ? location : undefined,
      minBeds: minBeds ? minBeds : undefined,
      minPrice: minPrice ? getNumberFromPriceString(minPrice) : undefined,
      maxPrice: maxPrice ? getNumberFromPriceString(maxPrice) : undefined,
      propertyType: propertyType ? propertyType : undefined,
      excludeSold,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onChange={handleSubmit(onSubmit)}
        className="flex w-full max-w-[68rem] flex-col items-center justify-center gap-4 lg:grid lg:grid-cols-2 lg:gap-2 xl:grid-cols-[auto,1fr,auto,auto]"
      >
        <Controller
          render={({ field: { value, onChange, name } }) => (
            <BuyRentToggle
              updateSelectOnChange
              onChange={onChange}
              value={value}
              name={name}
              size="sm"
            />
          )}
          name="buyOrRent"
          control={control}
          defaultValue={"buy"}
        />
        <TextInput
          name="location"
          label="Location"
          placeholder="Begin your search by town or postcode... i.e RG21"
          hideLabel
        />

        <div className="flex w-full flex-col md:col-span-full xl:col-span-1">
          <button
            type="button"
            onClick={() => setMenuOpen((state) => !state)}
            className="relative flex h-[3.5rem] w-full min-w-[15rem] items-center justify-center gap-2 rounded-big bg-primary-200 px-3 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 lg:h-[4.625rem]"
          >
            Advanced Search
            <motion.div
              animate={{
                rotateX: menuOpen ? "-180deg" : "0deg",
                transition: { duration: 0.4 },
              }}
            >
              <FaChevronDown />
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
        </div>
        <div className="col-span-full w-full">
          <PropertySearchMenu {...{ menuOpen }} />
        </div>
      </form>
    </FormProvider>
  );
}
