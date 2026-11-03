import CardCarousel from "@/components/marketing/CardCarousel";
import NewsCard from "@/components/marketing/NewsCard";
import { formatShortDate } from "@/lib/utils";

interface Article {
  title: string;
  href: string;
  category?: string;
  /** ISO date, formatted here so the page can hand over the raw CMS value. */
  publishedDate?: string;
  image?: string;
}

interface Props {
  heading: string;
  articles: Article[];
}

/** 1.1 up on mobile, then 2 and 3 across. 786px, not md's 768px, is the original's Swiper breakpoint. */
export default function NewsSlider({ heading, articles }: Props) {
  return (
    <CardCarousel heading={heading} itemClassName="basis-[90.9%] min-[786px]:basis-1/2 xl:basis-1/3">
      {articles.map(({ publishedDate, ...article }) => (
        <NewsCard key={article.href} date={formatShortDate(publishedDate)} {...article} />
      ))}
    </CardCarousel>
  );
}
