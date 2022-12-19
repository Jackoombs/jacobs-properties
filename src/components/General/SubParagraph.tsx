interface Props {
  text: string;
}

export default function SubParagraph({ text }: Props) {
  return <p className="text-sm text-primary-100">{text}</p>;
}
