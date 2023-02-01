import SectionHeader from "../../General/Text/SectionHeader";
import Copy from "../../General/Text/Copy";
import InputsWrapper from "../ReactHook/InputsWrapper";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import DateInput from "../ReactHook/DateInput";
import DayPeriodInput from "../ReactHook/DayPeriodInput";
import { IoMdAdd } from "react-icons/io/index.js";
import { IoMdRemove } from "react-icons/io/index.js";
import Error from "../ReactHook/Error";

interface Props {
  price: string;
  address: string;
}

export default function FormStage1({ price, address }: Props) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "dates",
  });

  const dates = watch("dates");

  const handleRemove = () => {
    remove(dates.length - 1);
  };

  return (
    <>
      <div className="text-center">
        <SectionHeader className="w-full pb-3">Book a viewing</SectionHeader>
        <Copy size="lg">
          <>
            <strong>{price}</strong> - {address}
          </>
        </Copy>
      </div>

      <InputsWrapper>
        <>
          {fields.map((field, index) => (
            <div
              className="col-span-full flex grid-cols-2 flex-col gap-2 md:grid"
              key={field.id}
            >
              <Controller
                key={field.id}
                control={control}
                name={`dates.${index}.date`}
                render={({ field: { onChange, value, onBlur, name } }) => (
                  <DateInput
                    hideLabel={index === 0 ? false : true}
                    label="Date"
                    {...{ onChange, value, onBlur, name }}
                  />
                )}
              />
              <DayPeriodInput
                hideLabel={index === 0 ? false : true}
                index={index}
              />
            </div>
          ))}

          <div>
            <Error name="dates" />
            {dates.length > 1 && (
              <button
                onClick={handleRemove}
                className="font-harms flex w-max items-center gap-2 text-sm font-normal text-primary-100 decoration-primary-100 decoration-1 underline-offset-4 hover:underline"
              >
                <IoMdRemove className="mb-1 text-2xl text-secondary-100" />{" "}
                Remove additional date
              </button>
            )}
            <button
              onClick={() => append({ dates: "" })}
              className="font-harms flex w-max items-center gap-2 text-sm font-normal text-primary-100 decoration-primary-100 decoration-1 underline-offset-4 hover:underline"
            >
              <IoMdAdd className="mb-1 text-2xl text-secondary-100" /> Add
              additional date
            </button>
          </div>
        </>
      </InputsWrapper>
    </>
  );
}
