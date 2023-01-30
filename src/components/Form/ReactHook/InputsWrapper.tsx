interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function InputsWrapper({ children }: Props) {
  return (
    <div className="mx-auto grid w-full grid-cols-2 gap-4 sm:max-w-[25rem]">
      {children}
    </div>
  );
}
