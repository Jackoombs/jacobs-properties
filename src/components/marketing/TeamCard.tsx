import { useState } from "react";
import { Info } from "lucide-react";
import ScreenModal from "@/components/common/ScreenModal";
import { SectionHeader, SectionLabel, SectionSubHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import Link from "@/components/common/Link";
import { LinkedinIcon } from "@/components/common/BrandIcons";

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedInUrl?: string;
}

/** A team member photo, name and role; clicking opens their bio full-screen. */
export default function TeamCard({ name, role, bio, image, email, linkedInUrl }: TeamMember) {
  const [isOpen, setIsOpen] = useState(false);
  const imageAlt = `${name}, ${role}`;

  return (
    <>
      {/* The LinkedIn link sits over the photo as a sibling of the button
          rather than inside it, because a link may not be nested in a button. */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full flex-col gap-6 text-left"
        >
          <div className="overflow-hidden rounded-big">
            <img
              className="aspect-square w-full object-cover duration-300 hover:scale-110"
              src={image}
              alt={imageAlt}
              loading="lazy"
            />
          </div>
          <div className="flex w-full flex-col gap-2 text-primary-100">
            <div className="flex items-center justify-between">
              <SectionSubHeader size="lg">{name}</SectionSubHeader>
              <Info className="mr-2 size-6 shrink-0" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[1.4px]">{role}</p>
          </div>
        </button>
        {linkedInUrl && (
          <a
            className="absolute right-0 top-0 p-5"
            target="_blank"
            rel="noopener noreferrer"
            href={linkedInUrl}
            aria-label={`${name} on LinkedIn`}
          >
            <LinkedinIcon className="size-[1.125rem] bg-primary-100 text-white" />
          </a>
        )}
      </div>

      <ScreenModal variant="white" title={name} description={role} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative mx-auto flex w-full max-w-container-lg flex-1 items-center justify-center py-6">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            <img
              className="aspect-square w-full self-baseline justify-self-center rounded-big object-cover duration-300 hover:scale-110 sm:max-w-lg"
              src={image}
              alt={imageAlt}
            />
            <div>
              <SectionHeader className="pb-2">{name}</SectionHeader>
              <SectionLabel>{role}</SectionLabel>
              {bio && (
                <Copy className="max-w-[40rem] py-9" size="lg">
                  {bio}
                </Copy>
              )}
              {(email || linkedInUrl) && (
                <div className="grid grid-cols-[4fr_1fr] items-center gap-12 md:flex">
                  {email && (
                    <Link size="sm" link={`mailto:${email}`} type="secondary" newTab>
                      Email me
                    </Link>
                  )}
                  {linkedInUrl && (
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>
                      <LinkedinIcon className="size-6 text-primary-100" />
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
