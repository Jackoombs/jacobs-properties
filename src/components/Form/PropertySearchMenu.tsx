import SelectInput from "./ReactHook/SelectInput";
import { motion, AnimatePresence } from "framer-motion";
import { generatePriceOptions } from "../../utils";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import CheckboxInput from "./ReactHook/CheckboxInput";

interface Props {
  className?: string;
  menuOpen: boolean;
}

export default function PropertySearchMenu({ className, menuOpen }: Props) {
  const { watch, control } = useFormContext();
  const buyOrRent = watch("buyOrRent");

  const priceOptions =
    buyOrRent === "buy"
      ? generatePriceOptions(0, 2000000, 25000)
      : generatePriceOptions(0, 4000, 100);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className={clsx("col-span-full w-full overflow-hidden", className)}
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
                isNumber
              />
              <SelectInput
                name="minPrice"
                label="Min Price"
                placeholder="Min Price"
                options={priceOptions}
              />
              <SelectInput
                name="maxPrice"
                label="Max Price"
                placeholder="Max Price"
                options={priceOptions}
              />
              <SelectInput
                name="propertyType"
                label="Property Type"
                placeholder="Property Type"
                options={[
                  "Detached",
                  "Semi-Detached",
                  "Apartment",
                  "Bungalow",
                  "Commerical",
                ]}
              />
            </div>
            <Controller
              render={({ field: { value, onChange, name } }) => (
                <CheckboxInput
                  name={name}
                  onChange={onChange}
                  value={value}
                  label="Exlcude sold / under offer"
                />
              )}
              name="excludeSold"
              control={control}
              defaultValue={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
