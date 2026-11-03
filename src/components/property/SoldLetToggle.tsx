import { cn } from "@/lib/utils";

export type SoldLet = "SOLD" | "LET";

interface Props {
  toggle: SoldLet;
  setToggle: (value: SoldLet) => void;
}

/** Sliding SOLD/LET pill, sits inline inside the section heading. */
export default function SoldLetToggle({ toggle, setToggle }: Props) {
  return (
    <div className="w-[10.625rem] text-[0.875rem] lg:w-56">
      <div className="relative flex h-16 w-full items-center rounded-big bg-primary-200 lg:h-[4.625rem]">
        {(["SOLD", "LET"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setToggle(value)}
            aria-pressed={toggle === value}
            className={cn(
              "relative z-10 h-full w-1/2 flex-1 bg-transparent font-semibold uppercase tracking-[1.4px] duration-300",
              toggle === value ? "text-white" : "text-primary-100",
            )}
          >
            {value}
          </button>
        ))}
        <div
          aria-hidden
          className={cn(
            "absolute top-[5px] h-[calc(100%-10px)] w-[calc(50%-10px)] rounded-[0.5rem] bg-primary-100 duration-300 ease-in-out",
            toggle === "SOLD" ? "left-[5px]" : "left-[calc(50%+5px)]",
          )}
        />
      </div>
    </div>
  );
}
