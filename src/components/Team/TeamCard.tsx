import SectionSubHeader from "../General/Text/SectionSubHeader";
import { FaInfoCircle, FaLinkedin } from "react-icons/fa/index.js";
import { BsLinkedin } from "react-icons/bs/index.js";
import type { TeamCardType } from "./teamTemplate";
import ScreenModal from "../Layout/ScreenModal";
import { useState } from "react";
import SectionHeader from "../General/Text/SectionHeader";
import SectionLabel from "../General/Text/SectionLabel";
import Copy from "../General/Text/Copy";
import Link from "../General/Link";

export default function TeamCard({
  name,
  role,
  bio,
  imagePath,
  linkedInLink,
  email,
}: TeamCardType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex flex-col gap-6">
        <div className="relative overflow-hidden rounded-big">
          <img
            className="aspect-square duration-300 hover:scale-110"
            src={imagePath}
            alt={`${name}, ${role}`}
          />
          <a
            className="absolute right-0 top-0 p-5"
            target="_blank"
            href={linkedInLink}
          >
            <BsLinkedin className="bg-primary-100 text-lg text-white" />
          </a>
        </div>
        <div className="flex flex-col gap-2 text-primary-100">
          <div className="flex items-center justify-between">
            <SectionSubHeader size="lg">{name}</SectionSubHeader>
            <FaInfoCircle className="mr-2 text-2xl" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[1.4px]">
            {role}
          </p>
        </div>
      </button>

      <ScreenModal
        variant="white"
        className="flex flex-col"
        {...{ isOpen, setIsOpen }}
      >
        <div className="relative mx-auto flex w-full max-w-container-lg flex-1 items-center justify-center py-6">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            <img
              className="aspect-square self-baseline justify-self-center duration-300 hover:scale-110 sm:max-w-lg"
              src={imagePath}
              alt={`${name}, ${role}`}
            />
            <div>
              <SectionHeader className="pb-2">{name}</SectionHeader>
              <SectionLabel>{role}</SectionLabel>
              <Copy className="max-w-[40rem] py-9" size="lg">
                {bio}
              </Copy>
              {(email || linkedInLink) && (
                <div className="grid grid-cols-[4fr_1fr] items-center gap-12 md:flex">
                  {email && (
                    <Link
                      size="sm"
                      link={`mailto:${email}`}
                      type="secondary"
                      newTab
                    >
                      Email me
                    </Link>
                  )}
                  {linkedInLink && (
                    <a href={linkedInLink} target="_blank">
                      <FaLinkedin className="text-2xl text-primary-100" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScreenModal>
    </>
  );
}
