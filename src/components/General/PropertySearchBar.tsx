import clsx from "clsx";
import { useState } from "react";
import BuyRentToggle from "./BuyRentToggle";

export default function PropertySearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [toggle, setToggle] = useState("BUY");

  return (
    <div className="flex w-full flex-col items-center gap-[18px] lg:flex-row">
      <BuyRentToggle {...{ toggle, setToggle }} />
      <form
        action=""
        className={clsx(
          "box-border flex h-[4.875rem] w-full flex-1 items-center gap-2 rounded-big border-primary-100 bg-white px-[5%] md:px-8",
          isFocused ? "outline outline-2 outline-primary-100" : ""
        )}
      >
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className=" w-full bg-transparent text-base font-medium text-primary-100 placeholder:text-primary-100 focus:outline-none"
          type="text"
          placeholder="Begin your search by town or postcode..."
        />
        <button type="submit" className="block py-4">
          <div className="-rotate-45 ">
            <span className="text-2xl font-bold text-primary-100">&#9906;</span>
          </div>
        </button>
      </form>
    </div>
  );
}
