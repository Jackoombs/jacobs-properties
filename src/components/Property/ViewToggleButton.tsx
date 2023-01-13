import clsx from "clsx";

interface Props {
  state: "list" | "grid" | "map";
  setState: React.Dispatch<React.SetStateAction<"list" | "grid" | "map">>;
  buttonState: "list" | "grid" | "map";
  isMobile: boolean;
  children: JSX.Element;
}

export default function ViewToggleBtn({
  state,
  setState,
  buttonState,
  isMobile,
  children,
}: Props) {
  return (
    <button
      onClick={() => setState(buttonState)}
      className={clsx(
        "relative z-10 flex h-full w-1/2 items-center justify-center text-xl duration-300",
        isMobile ? "w-1/2" : "w-1/3",
        state === buttonState ? "text-white" : "text-primary-100"
      )}
    >
      {children}
    </button>
  );
}
