import { TbCheck } from "react-icons/tb/index.js";
import { SlClose } from "react-icons/sl/index.js";
import { BsFillCircleFill } from "react-icons/bs/index.js";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import Button from "../../General/Button";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormStep5({ setIsOpen }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative flex h-[5rem] items-center justify-center lg:h-[10rem]">
          <TbCheck className="absolute z-10 text-[3rem] text-primary-100 lg:text-8xl" />
          <BsFillCircleFill className="absolute text-[5rem] text-secondary-100 lg:text-[10rem]" />
        </div>
        <SectionHeader textColor="text-white">
          Thank you for your valuation request.
        </SectionHeader>
        <Copy textColor="text-white" size="lg">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore.
        </Copy>
        <Button
          className="mt-4"
          onClick={() => setIsOpen(false)}
          type="button"
          variant="secondary"
          size="sm"
        >
          Close
        </Button>
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
