import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Menu from "./Menu";

export default function MenuBtn({ color }: { color: string }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <button onClick={() => setMenuOpen(true)} className="h-7">
        <div className="flex h-full max-h-5 w-8 flex-col justify-between duration-75 hover:max-h-7">
          <div className={`h-[0.125rem] bg-${color}`}></div>
          <div className={`h-[0.125rem] bg-${color}`}></div>
          <div className={`h-[0.125rem] bg-${color}`}></div>
        </div>
      </button>
      <Menu {...{ menuOpen, setMenuOpen }} />
    </>
  );
}
