import clsx from "clsx";
import type { FAQCategory } from "./FAQMenu";

interface Props {
  children: FAQCategory;
  currentItem: FAQCategory;
  setCurrentItem: React.Dispatch<React.SetStateAction<FAQCategory>>;
}

export default function FAQMenuItem({
  children,
  currentItem,
  setCurrentItem,
}: Props) {
  return (
    <li>
      <button
        className={clsx(
          "text-xs font-semibold uppercase tracking-[1.4px] text-primary-100 decoration-secondary-100 decoration-2 underline-offset-8 sm:text-sm sm:tracking-[2.8px]",
          currentItem === children && "underline"
        )}
        onClick={() => setCurrentItem(children)}
      >
        {children}
      </button>
    </li>
  );
}
