import type { newsCardType } from "./NewsSlider";
import SectionLabel from "../General/Text/SectionLabel";
import SectionSubHeader from "../General/Text/SectionSubHeader";

export default function NewsCard({
  title,
  category,
  date,
  image,
}: newsCardType) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative overflow-hidden rounded-big">
        <img
          className="hover:scale-120 aspect-square duration-300"
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
          href={`/news/${title.toLowerCase().replace(" ", "-")}`}
          className="text-sm font-semibold uppercase tracking-[1.4px] decoration-primary-100 decoration-2 underline-offset-4 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
