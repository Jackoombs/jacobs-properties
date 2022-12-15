import clsx from "clsx";

interface Props {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

export default function BuyRentToggle({ toggle, setToggle }: Props) {
  return (
    <div className="text-xs font-semibold">
      <div className="relative flex h-[3.625rem] w-[10.75rem] items-center rounded-lg bg-primary-200">
        <button
          onClick={() => setToggle("SOLD")}
          className={clsx(
            "relative z-10 h-full flex-1 bg-transparent uppercase duration-500",
            toggle === "SOLD" ? "text-white" : "text-primary-100"
          )}
        >
          Sold
        </button>
        <button
          onClick={() => setToggle("LET")}
          className={clsx(
            "relative z-10 h-full flex-1 bg-transparent uppercase duration-500",
            toggle === "LET" ? "text-white" : "text-primary-100"
          )}
        >
          Let
        </button>
        <div
          className={clsx(
            "absolute top-[0.313rem] h-[3rem] w-[4.75rem] rounded-lg bg-primary-100 duration-500 ease-in-out",
            toggle === "SOLD" ? "left-[0.313rem]" : "left-[5.688rem]"
          )}
        ></div>
      </div>
    </div>
  );
}