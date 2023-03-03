import { useEffect, useState } from "react";
import GeneralButton from "../General/Button";
import ScreenModal from "../Layout/ScreenModal";
import Copy from "../General/Text/Copy";
import { IoMail } from "react-icons/io5/index.js";
import { FaCopy, FaFacebook, FaWhatsapp } from "react-icons/fa/index.js";
import clsx from "clsx";

interface Props {
  children: string;
  variant?:
    | "primary"
    | "secondary"
    | "white"
    | "transparent-white"
    | "transparent-blue";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
}

export default function SharePropertyButton({
  children,
  variant = "primary",
  size,
  type = "button",
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageWindow, setPageWindow] = useState<Window | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setPageWindow(window);
  }, []);

  const copyToClipboard = () => {
    if (pageWindow) {
      navigator.clipboard.writeText(pageWindow.location.href);
    }
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  };

  return (
    <>
      <GeneralButton
        onClick={() => setIsOpen(true)}
        {...{ variant, size, type, className }}
      >
        {children}
      </GeneralButton>
      <ScreenModal {...{ isOpen, setIsOpen }} className="flex flex-col">
        <div className="mx-auto flex w-full max-w-container-lg flex-1 flex-col items-center justify-center gap-8">
          <h2 className="text-4xl font-bold sm:text-5xl md:text-7xl">
            Share this property
          </h2>
          <Copy
            textColor="text-white"
            size="lg"
            className="max-w-[14rem] text-center sm:max-w-none "
          >
            Click one of the options below to share this property
          </Copy>
          <div className="grid w-max grid-cols-2 gap-6 md:grid-cols-4">
            <a
              target="_blank"
              href={`mailto:?body=${pageWindow?.location.href}`}
              className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-big bg-[#1A3D66]"
            >
              <IoMail className="text-4xl" />
              <p className="text-base">Mail</p>
            </a>
            <button
              onClick={copyToClipboard}
              className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-big bg-[#1A3D66]"
            >
              <FaCopy
                className={clsx(
                  "text-4xl",
                  !showCopied ? "text-white" : "text-primary-100"
                )}
              />
              <p className="text-base">
                {!showCopied ? "Copy link" : "Copied!"}
              </p>
            </button>
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageWindow?.location.href}`}
              className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-big bg-[#1A3D66]"
            >
              <FaFacebook className="text-4xl" />
              <p className="text-base">Facebook</p>
            </a>
            <a
              target="_blank"
              href={`https://wa.me/?text=${pageWindow?.location.href}`}
              className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-big bg-[#1A3D66]"
            >
              <FaWhatsapp className="text-4xl" />
              <p className="text-base">Whatsapp</p>
            </a>
          </div>
        </div>
      </ScreenModal>
    </>
  );
}
