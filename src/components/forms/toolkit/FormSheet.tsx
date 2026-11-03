import ScreenModal from "@/components/common/ScreenModal";
import { SectionLabel, Display } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import LogoBlue from "@/assets/header/logo_blue.svg";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  heading: { text: string; width?: string };
  copy: { text: string; width?: string };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function FormSheet({
  label,
  heading,
  copy,
  isOpen,
  setIsOpen,
  children,
}: Props) {
  return (
    <ScreenModal
      variant="primary-200"
      title={label}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="lg:grid lg:grid-cols-2"
    >
      <div className="flex w-full items-center bg-white py-10">
        <div className="relative mx-auto flex h-full w-full max-w-container-lg items-center lg:max-w-[min(82%,37rem)]">
          <div className="w-full">
            <a href="/">
              <img
                className="absolute top-10 hidden h-auto w-[9rem] lg:inline lg:w-[12rem] xl:top-16"
                src={LogoBlue.src}
                alt="Jacobs Properties Logo"
              />
            </a>
            <SectionLabel padding="hero-md">{label}</SectionLabel>
            <Display className={cn("pb-6", heading.width)}>{heading.text}</Display>
            <Copy className={copy.width} size="md">
              {copy.text}
            </Copy>
          </div>
        </div>
      </div>
      {children}
    </ScreenModal>
  );
}
