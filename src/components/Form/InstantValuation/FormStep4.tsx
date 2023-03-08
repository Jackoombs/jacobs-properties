import { SlClose } from "react-icons/sl/index.js";
import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import type { Valpal } from "../../../env";
import Button from "../ExpertValuation/Button";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  valpalData: Valpal | null;
}

export default function FormStep4({ setIsOpen, valpalData }: Props) {
  const insertPoundSign = (text: string | undefined) => {
    if (!text) {
      return;
    }
    return text.replace("&pound;", "£");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-auto flex w-full max-w-[45rem] flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center justify-center gap-5 self-stretch rounded-big bg-secondary-100 py-20 px-3 text-primary-100">
          <Copy size="lg">Estimated Range</Copy>
          <SectionHeader>
            {`${insertPoundSign(valpalData?.minvaluation)} — ${insertPoundSign(
              valpalData?.maxvaluation
            )}`}
          </SectionHeader>
          <Copy size="lg">{`Predicted value = ${insertPoundSign(
            valpalData?.valuation
          )}`}</Copy>
        </div>
        <div className="justify-cente flex w-full flex-col items-center gap-5 rounded-big bg-white py-11 px-3 text-primary-100">
          <Copy size="lg" className="max-w-[28rem] text-center">
            Ready to arrange for one of our experts to visit your home and
            provide a free valuation?
          </Copy>
          <Button variant="primary" size="lg">
            Expert Valuation
          </Button>
        </div>
        <Copy
          size="lg"
          className="max-w-[28rem] text-center"
          textColor="text-white"
        >
          <>
            One of our experts will contact you shortly. Can’t wait? Call us on{" "}
            <a className="font-bold" href="tel:01256781300">
              01256 781300
            </a>
          </>
        </Copy>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-9 top-9 z-[102] hidden p-4 text-white lg:inline"
      >
        <SlClose className="text-3xl" />
      </button>
    </div>
  );
}
