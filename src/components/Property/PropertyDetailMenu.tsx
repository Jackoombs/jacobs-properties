import clsx from "clsx";

interface Props {
  currentMenuItem:
    | "Description"
    | "Floorplan"
    | "EPC"
    | "Gallery"
    | "Virtual Tour";
  setCurrentMenuItem: React.Dispatch<
    React.SetStateAction<
      "Description" | "Floorplan" | "EPC" | "Gallery" | "Virtual Tour"
    >
  >;
}

export default function PropertyDetailMobileMenu({
  currentMenuItem,
  setCurrentMenuItem,
}: Props) {
  const navItems: Props["currentMenuItem"][] = [
    "Description",
    "Floorplan",
    "EPC",
    "Gallery",
    "Virtual Tour",
  ];

  return (
    <ul className="grid w-full grid-cols-2 gap-3 md:flex">
      {navItems.map((item) => (
        <li key={item} className={item === "Virtual Tour" ? "col-span-2" : ""}>
          <button
            onClick={() => setCurrentMenuItem(item)}
            className={clsx(
              "flex h-14 w-full items-center justify-center rounded-big rounded-b-none text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 md:min-w-[8rem] md:text-black lg:min-w-[14rem]",
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
