import clsx from "clsx";

interface Props {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

export default function BuyRentToggle({ toggle, setToggle }: Props) {
  return (
    <div className=" w-[10.625rem] text-[0.875rem] lg:w-56">
      <div className="relative flex h-16 w-full items-center rounded-big bg-primary-200 lg:h-[4.625rem]">
        <button
          onClick={() => setToggle("SOLD")}
          className={clsx(
            "relative z-10 h-full w-1/2 flex-1 bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
            toggle === "SOLD" ? "text-white" : "text-primary-100"
          )}
        >
          Sold
        </button>
        <button
          onClick={() => setToggle("LET")}
          className={clsx(
            "relative z-10 h-full w-1/2 flex-1 bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
            toggle === "SOLD" ? "text-primary-100" : "text-white"
          )}
        >
          Let
        </button>
        <div
          className={clsx(
            "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-lg bg-primary-100 duration-300 ease-in-out",
            toggle === "SOLD" ? "left-[5px]" : "left-[calc(50%+5px)]"
          )}
        ></div>
      </div>
    </div>
  );
}
