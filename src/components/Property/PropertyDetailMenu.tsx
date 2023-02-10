import clsx from "clsx";
import type { Detail } from "./PropertyDetails";

interface Props {
  currentMenuItem: Detail;
  setCurrentMenuItem: React.Dispatch<React.SetStateAction<Detail>>;
  navItems: Detail[];
}

export default function PropertyDetailMobileMenu({
  currentMenuItem,
  setCurrentMenuItem,
  navItems,
}: Props) {
  return (
    <ul className="grid w-full grid-cols-2 gap-3 md:flex">
      {navItems.map((item, index) => (
        <li
          key={item}
          className={
            index === navItems.length - 1 && navItems.length % 2 !== 0
              ? "col-span-2"
              : ""
          }
        >
          <button
            onClick={() => setCurrentMenuItem(item)}
            className={clsx(
              "flex h-14 w-full items-center justify-center rounded-big text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 md:min-w-[8rem] md:rounded-b-none md:text-black lg:min-w-[14rem]",
              item === currentMenuItem
                ? "bg-secondary-100 md:bg-primary-200"
                : "bg-white"
            )}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
