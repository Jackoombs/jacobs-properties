import SectionLabel from "./General/Text/SectionLabel";
import SectionSubHeader from "./General/Text/SectionSubHeader";
import Copy from "./General/Text/Copy";

interface Props {
  title: string;
  text: string;
  index: number;
}

export default function ProcessCard({ title, text, index }: Props) {
  return (
    <div className="h-full rounded-big bg-primary-100 p-11">
      <SectionLabel
        text={`step ${index + 1}`}
        padding="hero-lg"
        textColor="text-secondary-100"
      />
      <SectionSubHeader
        text={title}
        size="lg"
        textColor="text-white"
        addClasses="pb-2"
      />
      <Copy text={text} size="md" textColor="text-white" />
    </div>
  );
}
