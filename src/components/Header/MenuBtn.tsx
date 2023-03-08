import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Menu from "./Menu";

export default function MenuBtn({ color }: { color: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="h-7"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex h-full max-h-5 w-9 flex-col justify-between duration-150 hover:max-h-7">
          <div
            className={clsx(
              `h-[0.125rem] bg-${color}`,
              isHover && "bg-secondary-100 duration-150"
            )}
          ></div>
          <div
            className={clsx(
              `h-[0.125rem] bg-${color}`,
              isHover && "bg-secondary-100 duration-150"
            )}
          ></div>
          <div
            className={clsx(
              `h-[0.125rem] bg-${color}`,
              isHover && "bg-secondary-100 duration-150"
            )}
          ></div>
        </div>
      </button>
      <Menu {...{ menuOpen, setMenuOpen }} />
    </>
  );
}
