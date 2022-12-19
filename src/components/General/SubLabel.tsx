interface Props {
  text: string;
  classes?: string;
}

export default function SubLabel({ text, classes }: Props) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] text-primary-100 ${classes}`}
    >
      {text}
    </p>
  );
}
