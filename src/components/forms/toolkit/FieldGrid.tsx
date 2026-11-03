export default function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto grid w-full grid-cols-2 gap-4">{children}</div>;
}
