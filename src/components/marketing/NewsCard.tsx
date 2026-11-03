import { SectionLabel, SectionSubHeader } from "@/components/common/Text";

export interface NewsArticle {
  title: string;
  href: string;
  category?: string;
  /** Already formatted for display, for example "8 Mar 23". */
  date?: string;
  image?: string;
}

export default function NewsCard({ title, href, category, date, image }: NewsArticle) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative overflow-hidden rounded-big">
        <img
          className="aspect-[1.31/1] w-full object-cover object-center duration-300"
          src={image}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-4 text-primary-100">
        <SectionLabel>{[category, date].filter(Boolean).join(" | ")}</SectionLabel>
        <SectionSubHeader className="line-clamp-2" size="sm">
          {title}
        </SectionSubHeader>
        <a
          href={href}
          className="text-sm font-semibold uppercase tracking-[1.4px] decoration-primary-100 decoration-2 underline-offset-4 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
