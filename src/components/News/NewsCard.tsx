import type { newsCardType } from "./NewsSlider";
import SectionLabel from "../General/Text/SectionLabel";
import SectionSubHeader from "../General/Text/SectionSubHeader";

export default function NewsCard({
  title,
  category,
  date,
  image,
}: newsCardType) {
  const getHref = (title: string) => {
    const specialCharsRegex = /[^A-Za-z0-9\s]/g;

    const cleanStr = title
      .toLowerCase()
      .replaceAll(specialCharsRegex, "")
      .replaceAll(" ", "-");

    return `/news/${cleanStr}`;
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative overflow-hidden rounded-big">
        <img
          className="hover:scale-120 aspect-[1.31/1] w-full object-cover object-center duration-300"
          src={image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4 text-primary-100">
        <SectionLabel>{`${category} | ${date}`}</SectionLabel>
        <SectionSubHeader className="line-clamp-2" size="sm">
          {title}
        </SectionSubHeader>
        <a
          href={getHref(title)}
          className="text-sm font-semibold uppercase tracking-[1.4px] decoration-primary-100 decoration-2 underline-offset-4 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
