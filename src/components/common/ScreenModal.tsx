import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { CloseCircleIcon } from "@/components/common/FilledIcons";
import LogoBlue from "@/assets/header/logo_blue.svg";
import LogoGreen from "@/assets/header/logo_green.svg";
import { cn } from "@/lib/utils";

interface Props {
  /** The panel's colour: navy, pale blue or white. */
  variant?: "primary-100" | "primary-200" | "white";
  /** Read out by screen readers in place of a visible heading. */
  title: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

const closeIcon = <CloseCircleIcon className="size-[1.875rem]" />;

/**
 * A full-screen panel that slides in from the right. Small screens get a bar
 * with the logo and a close button; large ones a close button in the corner.
 * The original's ScreenModal, used for the gallery, sharing, forms and bios.
 */
export default function ScreenModal({
  variant = "primary-200",
  title,
  description,
  isOpen,
  setIsOpen,
  className,
  children,
}: Props) {
  const onNavy = variant === "primary-100";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        // Without a description Radix warns unless told there isn't meant to be one.
        {...(description ? {} : { "aria-describedby": undefined })}
        className={cn(
          "flex flex-col gap-0 overflow-y-auto border-none p-0 text-base data-[side=right]:w-full data-[side=right]:max-w-none data-[side=right]:sm:max-w-none",
          variant === "primary-100" && "bg-primary-100 text-primary-200",
          variant === "primary-200" && "bg-primary-200 text-primary-100",
          variant === "white" && "bg-white text-primary-100",
          className,
        )}
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        {description && <SheetDescription className="sr-only">{description}</SheetDescription>}
        <div className={cn("py-4 lg:hidden", onNavy ? "bg-primary-100 text-primary-200" : "bg-white text-primary-100")}>
          <div className="mx-auto flex w-full max-w-container-lg justify-between">
            <a href="/">
              <img
                className="h-auto w-[9rem]"
                src={(onNavy ? LogoGreen : LogoBlue).src}
                alt="Jacobs Properties Logo"
              />
            </a>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close" className="p-4">
              {closeIcon}
            </button>
          </div>
        </div>
        {children}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute right-9 top-9 z-10 hidden p-4 lg:inline"
        >
          {closeIcon}
        </button>
      </SheetContent>
    </Sheet>
  );
}
