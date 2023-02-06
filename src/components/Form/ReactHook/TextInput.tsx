import clsx from "clsx";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Error from "./Error";

export type Props = {
  name: string;
  label: string;
  placeholder: string;
  hideLabel?: boolean;
  colSpanFull?: boolean;
  required?: boolean;
  type?: "text" | "email" | "tel";
  isNumber?: boolean;
  isBorderless?: boolean;
};

export default function TextInput({
  name,
  label,
  placeholder,
  hideLabel = false,
  colSpanFull = false,
  required = false,
  type = "text",
  isNumber = false,
  isBorderless = false,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<any>();

  let registerOptions: RegisterOptions = {
    required: {
      value: required,
      message: "This is a required field",
    },
    ...(type === "email" && {
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email address",
      },
    }),
    ...(type === "tel" && {
      pattern: {
        value:
          /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
        message: "Please enter a valid phone number",
      },
    }),
    ...(isNumber && {
      pattern: {
        value: /[0-9]+/,
        message: "Please enter a number",
      },
    }),
  };

  const borderColor = () => {
    if (isBorderless) {
      return errors[name]?.message
        ? "border-error focus:border-error"
        : "focus:border-primary-100";
    } else {
      return errors[name]?.message
        ? "border-error focus:border-error"
        : "border-primary-100";
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
        {label}
      </label>
      <div className="flex w-full flex-col gap-1">
        <input
          type={type}
          {...register(name, registerOptions)}
          inputMode={isNumber ? "numeric" : undefined}
          className={clsx(
            "flex h-16 w-full items-center rounded-big border bg-transparent px-5 text-primary-100 placeholder:text-placeholder focus:outline-none lg:min-w-[11.5rem]",
            borderColor()
          )}
          placeholder={placeholder}
        />
        <Error {...{ name }} />
      </div>
    </div>
  );
}
