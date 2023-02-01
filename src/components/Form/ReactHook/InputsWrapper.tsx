import clsx from "clsx";

interface Props {
  children: JSX.Element | JSX.Element[];
  maxWidth?: string;
}

export default function InputsWrapper({ children }: Props) {
  return (
    <div className={clsx("mx-auto grid w-full grid-cols-2 gap-4")}>
      {children}
    </div>
  );
}
