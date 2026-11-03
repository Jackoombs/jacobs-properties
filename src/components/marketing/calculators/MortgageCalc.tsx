import { useState } from "react";
import { SectionSubHeader } from "@/components/common/Text";
import MortgageInput from "./MortgageInput";
import { formatGbp, parseNumber } from "./currency";

export default function MortgageCalc() {
  const [price, setPrice] = useState("£300,000");
  const [deposit, setDeposit] = useState("£30,000(10%)");
  const [loanLength, setLoanLength] = useState("25 years");
  const [interestRate, setInterestRate] = useState("2.25%");

  const formatDeposit = (value: number) =>
    `${formatGbp(value)}(${Math.round((value / parseNumber(price)) * 100)}%)`;

  const mortgageRate = (
    price: number,
    deposit: number,
    loanLength: number,
    interestRate: number,
  ): string => {
    const loanAmount = price - deposit;
    const loanLengthMonths = loanLength * 12;
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyPayment =
      loanAmount *
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanLengthMonths)));
    if (monthlyPayment < 0 || monthlyPayment === Infinity || Number.isNaN(monthlyPayment)) {
      return formatGbp(0);
    }
    return formatGbp(monthlyPayment);
  };

  return (
    <div className="w-full rounded-big bg-primary-100 px-3 py-8 md:px-8 lg:p-12">
      <form>
        <SectionSubHeader className="pb-9" textColor="text-white" size="lg">
          Mortgage calculator
        </SectionSubHeader>
        <div className="flex flex-col gap-3 pb-9">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-6">
            <MortgageInput
              id="price"
              label="Property Price"
              value={price}
              setValue={setPrice}
              incrementAmount={25000}
              formatNumber={formatGbp}
              getNumber={parseNumber}
            />
            <MortgageInput
              id="deposit"
              label="Deposit"
              value={deposit}
              setValue={setDeposit}
              incrementAmount={1000}
              formatNumber={formatDeposit}
              getNumber={parseNumber}
            />
          </div>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-6">
            <MortgageInput
              id="loanLength"
              label="Loan length"
              value={loanLength}
              setValue={setLoanLength}
              incrementAmount={1}
              formatNumber={(value) => `${value} years`}
              getNumber={parseNumber}
            />
            <MortgageInput
              id="interestRate"
              label="Interest Rate"
              value={interestRate}
              setValue={setInterestRate}
              incrementAmount={0.25}
              formatNumber={(value) => `${value}%`}
              getNumber={parseNumber}
            />
          </div>
        </div>
        <div className="text-white">
          <p className="pb-4 text-base font-normal leading-[1.25rem]">
            Your approximate mortgage cost is
          </p>
          <p className="text-[2.375rem] font-semibold leading-[47.5px]">
            {`${mortgageRate(
              parseNumber(price),
              parseNumber(deposit),
              parseNumber(loanLength),
              parseNumber(interestRate),
            )}/month`}
          </p>
        </div>
      </form>
    </div>
  );
}
