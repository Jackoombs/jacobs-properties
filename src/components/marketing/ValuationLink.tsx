import { useState } from "react";
import { ArrowRight } from "lucide-react";
import InstantValuationSheet from "@/components/forms/instant-valuation/InstantValuationSheet";
import ExpertValuationSheet from "@/components/forms/expert-valuation/ExpertValuationSheet";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  valuationType: "instant" | "expert";
  backgroundColor: "bg-white" | "bg-secondary-100";
  /** Extra classes for the text, usually a max-width. */
  className?: string;
}

/**
 * A large card that opens one of the valuation forms: a line of copy with an
 * arrow that nudges right on hover. The copy is a span rather than a heading,
 * since headings can't sit inside a button.
 */
export default function ValuationLink({ children, valuationType, backgroundColor, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const Sheet = valuationType === "instant" ? InstantValuationSheet : ExpertValuationSheet;

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group w-full rounded-big text-primary-100 outline-offset-4 focus-visible:outline-2 focus-visible:outline-secondary-100",
          backgroundColor,
        )}
      >
        <span className="flex flex-col items-start justify-between gap-3 p-6 md:flex-row md:items-center lg:px-12 lg:py-16 xl:py-20">
          <span className={cn("block text-[1.625rem] font-semibold leading-[1.33] xl:text-[2rem]", className)}>
            {children}
          </span>
          <ArrowRight
            aria-hidden="true"
            className="relative size-12 shrink-0 transition-transform duration-300 group-hover:translate-x-2.5 group-focus-visible:translate-x-2.5 md:left-[10px] lg:size-[3.75rem]"
          />
        </span>
      </button>
      <Sheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
