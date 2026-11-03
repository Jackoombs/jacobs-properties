import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import Button from "@/components/common/Button";
import { CloseCircleIcon, TickIcon } from "@/components/common/FilledIcons";
import { cn } from "@/lib/utils";

/** The lime disc with a tick that tops every form's final step. */
export function SuccessBadge() {
  return (
    <div className="relative flex h-[5rem] items-center justify-center pb-12 lg:h-[10rem]">
      <TickIcon className="absolute z-10 size-12 text-primary-100 lg:size-24" />
      <div className="absolute size-20 rounded-full bg-secondary-100 lg:size-40" />
    </div>
  );
}

/**
 * The white corner close button on a form's navy final step. The panel's own
 * close button is navy, which vanishes here. Keyboard and screen-reader users
 * have that one and the step's Close button, so this one is for the mouse only.
 */
export function SuccessCornerClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      tabIndex={-1}
      aria-hidden="true"
      className="absolute right-9 top-9 z-[102] hidden p-4 text-white lg:inline"
    >
      <CloseCircleIcon className="size-[1.875rem]" />
    </button>
  );
}

interface Props {
  heading: string;
  message: string;
  onClose: () => void;
  /** Caps on how wide the text may run, where the original set them. */
  containerClassName?: string;
  headingClassName?: string;
  messageClassName?: string;
}

export default function SuccessStep({
  heading,
  message,
  onClose,
  containerClassName,
  headingClassName,
  messageClassName,
}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={cn("flex flex-col items-center gap-3 text-center", containerClassName)}>
        <SuccessBadge />
        <SectionHeader textColor="text-white" className={headingClassName}>
          {heading}
        </SectionHeader>
        <Copy textColor="text-white" size="lg" className={messageClassName}>
          {message}
        </Copy>
        <Button className="mt-4" onClick={onClose} type="button" variant="secondary">
          Close
        </Button>
      </div>
      <SuccessCornerClose onClose={onClose} />
    </div>
  );
}
