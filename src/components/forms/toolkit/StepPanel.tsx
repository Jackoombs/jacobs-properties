import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  step: number;
  currentStep: number;
  className?: string;
}

export default function StepPanel({
  children,
  step,
  currentStep,
  className = "md:w-[25rem]",
}: Props) {
  if (currentStep < step) return null;

  return (
    <div
      // Earlier steps stay mounted but hidden. (Not `block` for the current one:
      // tailwind-merge would swap it for `flex` and lose the gap.)
      className={cn("flex w-full flex-col gap-6", className, step !== currentStep && "hidden")}
    >
      {children}
    </div>
  );
}
