import clsx from "clsx";
import { useEffect } from "react";
import { FaList, FaMap } from "react-icons/fa/index.js";
import { BsGrid3X3GapFill } from "react-icons/bs/index.js";
import ViewToggleBtn from "./ViewToggleButton";

interface Props {
  state: "list" | "grid" | "map";
  setState: React.Dispatch<React.SetStateAction<"list" | "grid" | "map">>;
  isMobile: boolean;
}

export function ViewToggle({ state, setState, isMobile }: Props) {
  useEffect(() => {
    if (state === "list" && isMobile) {
      setState("grid");
    }
  }, []);

  useEffect(() => {
    if (state === "grid" && !isMobile) {
      setState("list");
    }
  }, []);

  return (
    <div
      className={clsx(
        "relative flex h-16 w-32 items-center justify-center rounded-big bg-primary-200",
        isMobile ? "w-32" : "w-48"
      )}
    >
      {!isMobile && (
        <ViewToggleBtn {...{ state, setState, isMobile }} buttonState="list">
          <FaList />
        </ViewToggleBtn>
      )}
      <ViewToggleBtn {...{ state, setState, isMobile }} buttonState="grid">
        <BsGrid3X3GapFill />
      </ViewToggleBtn>
      <ViewToggleBtn {...{ state, setState, isMobile }} buttonState="map">
        <FaMap />
      </ViewToggleBtn>
      <div
        className={clsx(
          "absolute left-[5px] h-[calc(100%-10px)] rounded-big bg-primary-100 duration-300 ease-in-out",
          isMobile ? "w-[calc(50%-10px)]" : "w-[calc(33.33%-10px)]",
          isMobile &&
            (state === "grid" ? "left-[5px]" : "left-[calc(50%+5px)]"),
          !isMobile &&
            ((state === "list" && "left-[5px]") ||
              (state === "grid" && "left-[calc(33.33%+5px)]") ||
              (state === "map" && "left-[calc(66.66%+5px)]"))
        )}
      ></div>
    </div>
  );
}
