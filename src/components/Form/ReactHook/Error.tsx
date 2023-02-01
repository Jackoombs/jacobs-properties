import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export default function Error({ name }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors[name]?.message && (
        <p className="pt-1 text-xs text-red-600">
          {String(errors[name]?.message)}
        </p>
      )}
    </>
  );
}
