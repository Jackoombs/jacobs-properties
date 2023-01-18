import SectionSubHeader from "../General/Text/SectionSubHeader";

interface Props {
  title: string;
  text: string;
  index: number;
}

export default function ProcessCard({ title, text, index }: Props) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-big bg-primary-100 p-6 md:p-11">
      <p className="text-[0.875rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] text-secondary-100">
        {`step ${index + 1}`}
      </p>
      <SectionSubHeader size="lg" textColor="text-white" className="font-bold">
        title
      </SectionSubHeader>
      <p className="font-regular text-base leading-5 text-white">{text}</p>
    </div>
  );
}
