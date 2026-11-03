import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueProp {
  reason: string;
  text: string;
}

interface Props {
  items: ValueProp[];
  cardBg?: string;
}

export default function ValueProps({ items, cardBg = "bg-primary-200" }: Props) {
  // -1 = all closed, as the original opened on click only.
  const [openIndex, setOpenIndex] = useState(-1);
  const baseId = useId();

  return (
    <ul className="flex flex-col items-center gap-2">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const panelId = `${baseId}-${index}`;

        return (
          <li key={item.reason} className={cn("w-full max-w-4xl rounded-big", cardBg)}>
            {/* The whole card is the button, exactly as the original — clicking
                the answer or the padding toggles it, not just the header row. */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full flex-col px-2 py-8 text-left outline-none md:px-9"
            >
              <div className="flex w-full items-start justify-between gap-2">
                <h3 className="w-full flex-1 text-lg font-semibold leading-[1.25] text-primary-400 lg:text-[1.5rem] xl:text-[2rem]">
                  {item.reason}
                </h3>
                {/* Plain `transition`, not just a duration: Tailwind v4's
                    rotate-* drives the standalone `rotate` property, which
                    only the default transition list covers. */}
                <Plus
                  className={cn(
                    "size-6 shrink-0 text-secondary-100 transition duration-400",
                    isOpen && "-rotate-45",
                  )}
                />
              </div>
              {/* 0fr -> 1fr animates to the content's natural height without
                  measuring it, so the answer and its 1.2rem gap slide open
                  together the way the original's framer-motion height did. */}
              <div
                id={panelId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-400",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                {/* The clipping wrapper must carry no padding of its own —
                    padding is part of min-content, so a padded grid item
                    refuses to collapse below it and 0fr leaves a gap. */}
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "pt-[1.2rem] text-[0.875rem] font-normal leading-[1.5] text-primary-100 transition-opacity duration-150 lg:text-[1.375rem]",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
