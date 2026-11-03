import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionSubHeader } from "@/components/common/Text";
import { formatGbp, parseNumber } from "./currency";

/** England & Northern Ireland residential SDLT bands, as the original site had them. */
function calculateStandardRate(price: number, isAdditional: boolean): number {
  if (price < 250001) {
    return price * (isAdditional ? 0.03 : 0);
  }
  if (price > 250000 && price < 925001) {
    return (price - 250000) * (isAdditional ? 0.08 : 0.05) + (isAdditional ? 7500 : 0);
  }
  if (price > 925000 && price < 1500001) {
    return (price - 925000) * (isAdditional ? 0.13 : 0.1) + (isAdditional ? 61500 : 33750);
  }
  if (price > 1500000) {
    return (price - 1500000) * (isAdditional ? 0.15 : 0.12) + (isAdditional ? 136250 : 91250);
  }
  return 0;
}

function calculateStampDuty(price: number, buyerStatus: string): number {
  if (buyerStatus === "first") {
    if (price < 625000) {
      const taxableAmount = price - 450000;
      return taxableAmount > 0 ? taxableAmount * 0.05 : 0;
    }
    return calculateStandardRate(price, false);
  }
  if (buyerStatus === "next") return calculateStandardRate(price, false);
  if (buyerStatus === "additional") return calculateStandardRate(price, true);
  return 0;
}

export default function StampDutyCalc() {
  const [buyerStatus, setBuyerStatus] = useState("first");
  const [price, setPrice] = useState("£300,000");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueNoSign = parseNumber(e.currentTarget.value);
    if (/^\d*$/.test(valueNoSign.toString())) setPrice(formatGbp(valueNoSign));
  };

  return (
    <div className="w-full rounded-big bg-primary-100 px-3 py-8 md:px-8 lg:p-12">
      <form>
        <SectionSubHeader className="pb-9" textColor="text-white" size="lg">
          Stamp duty calculator
        </SectionSubHeader>

        <div className="flex flex-col gap-5 pb-9">
          <div className="flex flex-col gap-2">
            <label className="font-harm text-xs text-white" htmlFor="buyerStatus">
              I am
            </label>
            <div className="relative flex items-center justify-center">
              <select
                onChange={(e) => setBuyerStatus(e.currentTarget.value)}
                value={buyerStatus}
                className="relative w-full appearance-none rounded-big bg-white px-6 py-4 text-base font-normal leading-[1.25rem] text-primary-100/50"
                id="buyerStatus"
              >
                <option value="first">a first time buyer</option>
                <option value="next">buying my next home</option>
                <option value="additional">buying an additional property</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-6 size-4 text-primary-100" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-harm text-xs text-white" htmlFor="price">
              Property Price
            </label>
            <input
              id="price"
              type="text"
              inputMode="numeric"
              value={price}
              onChange={handleChange}
              className="relative w-full rounded-big bg-white px-6 py-4 text-primary-100/70"
            />
          </div>
        </div>
        <div className="text-white">
          <p className="pb-4 text-base font-normal leading-[1.25rem]">Stamp duty to pay is</p>
          <p className="text-[2.375rem] font-semibold leading-[47.5px]">
            {formatGbp(calculateStampDuty(parseNumber(price), buyerStatus))}
          </p>
        </div>
      </form>
    </div>
  );
}
