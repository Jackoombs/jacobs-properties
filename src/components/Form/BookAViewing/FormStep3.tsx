import { TbCheck } from "react-icons/tb/index.js";
import { SlClose } from "react-icons/sl/index.js";
import { BsFillCircleFill } from "react-icons/bs/index.js";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormStep3({ setIsOpen }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative flex h-[5rem] items-center justify-center lg:h-[10rem]">
          <TbCheck className="absolute z-10 text-[3rem] text-primary-100 lg:text-8xl" />
          <BsFillCircleFill className="absolute text-[5rem] text-secondary-100 lg:text-[10rem]" />
        </div>
        <SectionHeader textColor="text-white">
          Thank you for your viewing request.
        </SectionHeader>
        <Copy textColor="text-white" size="lg">
          We will be in touch with you shortly.
        </Copy>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-4 flex h-14 w-max items-center justify-center rounded-big bg-secondary-100 px-6 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110"
        >
          Close
        </button>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-9 top-9 z-[102] hidden p-4 text-white lg:inline"
      >
        <SlClose className="text-3xl " />
      </button>
    </div>
  );
}
