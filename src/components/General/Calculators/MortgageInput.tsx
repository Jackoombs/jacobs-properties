import IncrementBtn from "./IncrementBtn";

interface Props {
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  incrementAmount: number;
  formatNumber: (arg0: number) => string;
  getNumber: (arg0: string) => number;
}

export default function MortgageInput({
  id,
  label,
  value,
  setValue,
  incrementAmount,
  formatNumber,
  getNumber,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    let pattern = /^[\d]*\.?[\d]*$/;
    const valueNoSign = getNumber(value);
    const formattedValue = formatNumber(valueNoSign);

    if (pattern.test(valueNoSign.toString())) {
      setValue(formattedValue);
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      setValue((value) =>
        getNumber(value)
          .toString()
          .substring(0, value.length - 1)
      );
    }
  };

  const handleClick = (increment: number, isDecrement: boolean) => {
    setValue((value) => {
      let newValue = getNumber(value) + (isDecrement ? -increment : increment);
      if (newValue >= 0) {
        return formatNumber(newValue);
      } else {
        return value;
      }
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-harm text-xs text-white" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          onKeyDown={handleKeydown}
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          className="relative w-full rounded-big bg-white px-6 py-4 text-center text-primary-100 text-opacity-70"
        />
        <IncrementBtn
          handleClick={handleClick}
          isDecrement={true}
          {...{ setValue, incrementAmount }}
        />
        <IncrementBtn
          handleClick={handleClick}
          isDecrement={false}
          {...{ setValue, incrementAmount }}
        />
      </div>
    </div>
  );
}
