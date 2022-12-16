interface Props {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  register: any;
  errors: any;
}

export default function Input({
  id,
  type,
  name,
  label,
  placeholder,
  register,
  errors,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className="flex h-16 w-full items-center rounded-xl px-5 text-primary-100 outline-none outline-offset-0 placeholder:text-placeholder focus:outline-primary-100"
        {...register(id)}
        {...{ type, placeholder }}
      />
      {errors[id]?.message && (
        <p className="text-xs text-red-600">{errors[id]?.message}</p>
      )}
      <label className="hidden" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
