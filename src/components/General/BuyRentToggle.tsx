import clsx from "clsx";

interface Props {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

export default function BuyRentToggle({ toggle, setToggle }: Props) {
  return (
    <div className="text-xs font-semibold text-primary-100">
      <div className="relative flex h-[3.875rem] w-[16.875rem] items-center rounded-lg bg-white">
        <button
          onClick={() => setToggle("BUY")}
          className="relative z-10 h-full flex-1 bg-transparent uppercase"
        >
          Buy
        </button>
        <button
          onClick={() => setToggle("RENT")}
          className="relative z-10 h-full flex-1 bg-transparent uppercase"
        >
          Rent
        </button>
        <div
          className={clsx(
            "absolute top-[0.313rem] h-[3.25rem] w-[7.813rem] rounded-lg bg-secondary-100 duration-500 ease-in-out",
            toggle === "BUY" ? "left-[0.313rem]" : "left-[8.75rem]"
          )}
        ></div>
      </div>
    </div>
  );
}
