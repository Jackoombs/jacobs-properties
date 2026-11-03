import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  direction: "prev" | "next";
  onClick: () => void;
  /** White disc on photos; navy disc where the background is pale, e.g. the gallery lightbox. */
  variant?: "white" | "primary";
}

/** The round arrow that sits over the sides of a property image slider. */
export default function ImageNavButton({ direction, onClick, variant = "white" }: Props) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 z-10 flex size-8 -translate-y-1/2 scale-75 items-center justify-center rounded-full duration-100 hover:bg-secondary-100 md:scale-100",
        direction === "prev" ? "left-2 lg:left-7" : "right-2 lg:right-7",
        variant === "white" ? "bg-white text-primary-100" : "bg-primary-100 text-white",
      )}
    >
      <Icon className="size-[1.125rem]" aria-hidden="true" />
    </button>
  );
}
