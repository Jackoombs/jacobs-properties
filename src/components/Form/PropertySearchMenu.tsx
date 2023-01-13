import SelectInput from "./SelectInput";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheck } from "react-icons/bs/index.js";
import { priceNumberToPriceString } from "../../utils";
import clsx from "clsx";

interface Props {
  addClasses?: string;
  menuOpen: boolean;
  minBeds: "Min Beds" | number;
  setMinBeds: React.Dispatch<React.SetStateAction<"Min Beds" | number>>;
  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  propertyType: string;
  setPropertyType: React.Dispatch<
    React.SetStateAction<
      "House" | "Apartment" | "Bungalow" | "Commerical" | "Property Type"
    >
  >;
  excludeSoldOffer: boolean;
  setExcludeSoldOffer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PropertySearchMenu({
  addClasses,
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
}: Props) {
  const generatePriceOptions = (
    minPrice: number,
    maxPrice: number,
    interval: number
  ) => {
    const values: number[] = [];
    let currentValue = 0;
    while (minPrice + currentValue <= maxPrice) {
      values.push(minPrice + currentValue);
      currentValue += interval;
    }
    return values.map((value) => priceNumberToPriceString(value));
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className={clsx("col-span-full w-full overflow-hidden", addClasses)}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="box-border rounded-big py-4 lg:bg-primary-200 lg:p-9 lg:px-8 ">
            <div className="grid grid-cols-2 gap-3 pb-4 xl:grid-cols-4">
              <SelectInput
                name="minBeds"
                label="Min Bedrooms"
                placeholder="Min Beds"
                options={[...Array(11).keys()]}
                state={minBeds}
                setState={setMinBeds}
              />
              <SelectInput
                name="minPrice"
                label="Min Price"
                placeholder="Min Price"
                options={generatePriceOptions(0, 2000000, 25000)}
                state={minPrice}
                setState={setMinPrice}
              />
              <SelectInput
                name="maxPrice"
                label="Max Price"
                placeholder="Max Price"
                options={generatePriceOptions(0, 2000000, 25000)}
                state={maxPrice}
                setState={setMaxPrice}
              />
              <SelectInput
                name="propertyType"
                label="Property Type"
                placeholder="Property Type"
                options={["detached", "flat", "semi-detatched"]}
                state={propertyType}
                setState={setPropertyType}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <input
                  className="h-6 w-6 cursor-pointer appearance-none rounded-md border border-primary-100 focus:border-[#ff1010] focus:outline-none"
                  id="excludeSoldOffer"
                  type="checkbox"
                  checked={excludeSoldOffer}
                  onChange={(e) => setExcludeSoldOffer((state) => !state)}
                />

                <BsCheck
                  className={clsx(
                    "pointer-events-none absolute text-xl text-primary-100",
                    excludeSoldOffer ? "block" : "hidden"
                  )}
                />
              </div>
              <label
                className="cursor-pointer font-harm text-xs text-primary-100"
                htmlFor="excludeSoldOffer"
              >
                Exclude Sold / under offer
              </label>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
