import { useEffect, useState } from "react";
import { FacebookIcon, WhatsappIcon } from "@/components/common/BrandIcons";
import { CopyIcon, MailIcon } from "@/components/common/FilledIcons";
import Button from "@/components/common/Button";
import Copy from "@/components/common/Copy";
import ScreenModal from "@/components/common/ScreenModal";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  name: string;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

const tileClass = "flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-big bg-[#1A3D66]";

export default function ShareButton({ children, name, variant = "primary", size, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant={variant} size={size} className={className}>
        {children}
      </Button>
      <ScreenModal variant="primary-100" title={`Share this ${name}`} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="mx-auto flex w-full max-w-container-lg flex-1 flex-col items-center justify-center gap-8">
          <h2 className="text-4xl font-bold sm:text-5xl md:text-7xl">{`Share this ${name}`}</h2>
          <Copy textColor="text-white" size="lg" className="max-w-[14rem] text-center sm:max-w-none">
            {`Click one of the options below to share this ${name}`}
          </Copy>
          <div className="grid w-max grid-cols-2 gap-6 md:grid-cols-4">
            <a target="_blank" rel="noopener noreferrer" href={`mailto:?body=${pageUrl}`} className={tileClass}>
              <MailIcon className="size-9" />
              <p className="text-base">Mail</p>
            </a>
            <button type="button" onClick={copyToClipboard} className={tileClass}>
              <CopyIcon className={cn("size-9", showCopied ? "text-secondary-100" : "text-white")} />
              <p className="text-base" role="status">
                {showCopied ? "Copied!" : "Copy link"}
              </p>
            </button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
              className={tileClass}
            >
              <FacebookIcon className="size-9" />
              <p className="text-base">Facebook</p>
            </a>
            <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${pageUrl}`} className={tileClass}>
              <WhatsappIcon className="size-9" />
              <p className="text-base">WhatsApp</p>
            </a>
          </div>
        </div>
      </ScreenModal>
    </>
  );
}
