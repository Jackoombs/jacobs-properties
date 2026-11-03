import { useId, useState } from "react";
import { ChevronDown, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface Props {
  faqs: Faq[];
  /** Card colour — should contrast with the section behind it. */
  cardBg?: string;
}

/**
 * Stacked FAQ cards: chat icon, question, and a chevron that flips when open.
 * Hand-rolled rather than built on Radix so the whole card is one button, as
 * the original was — clicking the answer or the padding toggles it too.
 */
export default function FaqAccordion({ faqs, cardBg = "bg-white" }: Props) {
  // Keyed by faq id, not list position: /faq swaps the whole list when you
  // change category, and an index would leave an unrelated card open.
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <ul className="flex w-full flex-col items-center gap-2 md:gap-5">
      {faqs.map((faq, index) => {
        const isOpen = faq.id === openId;
        const panelId = `${baseId}-${index}`;

        return (
          <li key={faq.id} className={cn("w-full max-w-4xl rounded-[5px]", cardBg)}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full flex-col px-6 py-8 text-left outline-none md:px-9"
            >
              <div className="flex w-full items-center justify-between gap-8 lg:gap-14">
                <MessagesSquare className="size-5 shrink-0 text-secondary-100 lg:size-10" />
                <h3 className="flex-1 text-lg font-medium leading-normal text-primary-400 lg:text-[1.75rem]">
                  {faq.question}
                </h3>
                {/* The original flipped the chevron on its X axis rather than
                    spinning it. Needs plain `transition`, not a bare duration,
                    or transition-property is never set and it snaps. */}
                <ChevronDown
                  className={cn(
                    "size-6 shrink-0 text-secondary-100 transition duration-400",
                    isOpen && "[transform:rotateX(-180deg)]",
                  )}
                />
              </div>
              {/* 0fr -> 1fr animates to the answer's natural height without
                  measuring it. The clipping wrapper must carry no padding:
                  padding counts toward min-content, so a padded grid item
                  refuses to collapse and 0fr would leave a gap. */}
              <div
                id={panelId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-400",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  {/* Indented on large screens so the answer lines up under
                      the question rather than the icon. */}
                  <p
                    className={cn(
                      "whitespace-pre-wrap pt-[1.2rem] text-base text-primary-100 transition-opacity duration-150 lg:pl-[calc(3.5rem+2.5rem)] lg:pr-[calc(3.5rem+1.5rem)]",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {faq.answer}
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
