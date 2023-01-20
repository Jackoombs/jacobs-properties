import SectionSubHeader from "../General/Text/SectionSubHeader";
import { FaInfoCircle } from "react-icons/fa/index.js";
import { BsLinkedin } from "react-icons/bs/index.js";
import type { TeamCardType } from "./TeamSlider";

export default function TeamCard({
  name,
  role,
  imagePath,
  linkedInLink,
}: TeamCardType) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-big">
        <img
          className="aspect-square duration-300 hover:scale-110"
          src={imagePath}
          alt={`${name}, ${role}`}
        />
        <a className="absolute right-0 top-0 p-5" href={linkedInLink}>
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
    </div>
  );
}
