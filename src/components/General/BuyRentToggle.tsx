import clsx from "clsx";

interface Props {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

export default function BuyRentToggle({ toggle, setToggle }: Props) {
  return (
    <div className="w-full text-[0.875rem] text-primary-100 lg:w-[19.5rem]">
      <div className="relative flex h-[4.625rem] w-full items-center rounded-big bg-white">
        <button
          onClick={() => setToggle("BUY")}
          className="relative z-10 h-full w-1/2 flex-1 bg-transparent font-semibold uppercase tracking-[1.4px]"
        >
          Buy
        </button>
        <button
          onClick={() => setToggle("RENT")}
          className="relative z-10 h-full w-1/2 flex-1 bg-transparent font-semibold uppercase tracking-[1.4px]"
        >
          Rent
        </button>
        <div
          className={clsx(
            "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-lg bg-secondary-100 duration-300 ease-in-out",
            toggle === "BUY" ? "left-[5px]" : "left-[calc(50%+5px)]"
          )}
        ></div>
      </div>
    </div>
  );
}
