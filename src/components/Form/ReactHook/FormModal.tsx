import ScreenModal from "../../Layout/ScreenModal";
import SectionLabel from "../../General/Text/SectionLabel";
import Display from "../../General/Text/Display";
import Copy from "../../General/Text/Copy";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import LogoBlue from "../../../assets/images/header/logo_blue.svg";
import clsx from "clsx";

interface Props {
  label: string;
  heading: {
    text: string;
    width: string;
  };
  copy: {
    text: string;
    width: string;
  };
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormModal({
  children,
  isOpen,
  setIsOpen,
  label,
  heading,
  copy,
}: Props) {
  return (
    <ScreenModal
      {...{ isOpen, setIsOpen }}
      variant="primary-200"
      className="lg:grid lg:grid-cols-2"
    >
      <div className="flex w-full items-center bg-white py-10">
        <div className="relative mx-auto flex h-full w-full max-w-container-lg items-center lg:max-w-[min(82%,37rem)]">
          <div className="w-full">
            <div>
              <a href="/">
                <img
                  className="absolute top-10 hidden h-auto w-[9rem] lg:inline lg:w-[12rem] xl:top-16"
                  src={LogoBlue}
                  alt="Jacobs Properties Logo"
                />
              </a>
              <SectionLabel padding="hero-md">{label}</SectionLabel>
              <Display className={clsx("pb-6", heading.width)}>
                {heading.text}
              </Display>
              <Copy className={copy.width} size="md">
                {copy.text}
              </Copy>
            </div>
          </div>
        </div>
      </div>
      <>{children}</>
    </ScreenModal>
  );
}
