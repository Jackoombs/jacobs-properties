import clsx from "clsx";
import {
  appendErrors,
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";
import Error from "./Error";
import { IoMdSearch } from "react-icons/io/index.js";
import type React from "react";
import { ChangeEvent, useMemo } from "react";
import debounce from "lodash.debounce";

interface Props {
  name: string;
  value: string;
  onChange: (...e: any) => void;
  setAddressOptions: React.Dispatch<React.SetStateAction<any>>;
  colSpanFull?: boolean;
  hideLabel?: boolean;
}

export default function PostcodeInput({
  name,
  value,
  onChange,
  setAddressOptions,
  colSpanFull = false,
  hideLabel = false,
}: Props) {
  const {
    getValues,
    formState: { errors },
  } = useFormContext();

  const getAddress = async (postcode: string) => {
    const res = await fetch(
      `https://api.getAddress.io/find/${postcode}?api-key=${
        import.meta.env.PUBLIC_GET_ADDRESS_KEY
      }&expand=true `
    );
    const data = await res.json();
    console.log(data.addresses);
    setAddressOptions(data.addresses);
  };

  const regex =
    /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;

  const debouncedHandler = useMemo(
    () => debounce((postcode) => getAddress(postcode), 400),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (regex.test(e.currentTarget.value)) {
      const postcode = e.currentTarget.value;
      debouncedHandler(postcode);
    }
  };

  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-2 text-left",
        colSpanFull && "col-span-full"
      )}
    >
      <label
        className={clsx(
          "font-harm text-xs text-primary-100",
          hideLabel && "hidden"
        )}
        htmlFor={name}
      >
        Postcode
      </label>

      <div className="relative flex items-center">
        <input
          id={name}
          onChange={handleChange}
          value={value}
          type="text"
          className="flex h-16 w-full items-center rounded-big border border-primary-100 bg-transparent px-5 text-primary-100
      placeholder:text-primary-100 focus:outline-none lg:min-w-[11.5rem]"
          placeholder="Enter postcode"
        />
        <IoMdSearch className="absolute right-0 box-content p-5 text-2xl text-primary-100" />
      </div>
      <Error name={name} />
    </div>
  );
}