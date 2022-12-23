interface Props {
  text: string;
}

export default function MenuHeader({ text }: Props) {
  return (
    <>
      <hr className="border-secondary-100 pb-5 md:hidden" />
      <h3 className="pb-4 text-[0.75rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] text-white md:pb-7 md:text-[0.875rem]">
        {text}
      </h3>
    </>
  );
}
