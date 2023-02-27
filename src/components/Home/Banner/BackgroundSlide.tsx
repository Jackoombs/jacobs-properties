import clsx from "clsx";

interface Props {
  backgroundSrc: ImageMetadata;
  objectFit: string;
}

export default function BackgroundSlide({ backgroundSrc, objectFit }: Props) {
  return (
    <div
      className={clsx("h-screen w-screen bg-cover")}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url("${backgroundSrc.src}")`,
        backgroundPosition: objectFit,
      }}
    ></div>
  );
}
