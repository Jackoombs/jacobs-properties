interface Props {
  text: string;
  classes?: string;
}

export default function SubHeader({ text, classes }: Props) {
  return (
    <h2
      className={`text-2xl font-semibold text-primary-100 lg:text-3xl ${classes}`}
    >
      {text}
    </h2>
  );
}
