import { useMemo, useState } from "react";
import LabelledSelect from "@/components/common/LabelledSelect";
import Button from "@/components/common/Button";
import NewsCard, { type NewsArticle } from "@/components/marketing/NewsCard";
import { formatShortDate } from "@/lib/utils";

interface Article extends Omit<NewsArticle, "date"> {
  /** ISO date, formatted here so the page can hand over the raw CMS value. */
  publishedDate?: string;
}

interface Props {
  articles: Article[];
}

const ALL = "All";
const PAGE_SIZE = 12;

/** Every article as a card, with a category filter and a "load more" that reveals twelve at a time. */
export default function NewsGrid({ articles }: Props) {
  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => [ALL, ...new Set(articles.flatMap((article) => (article.category ? [article.category] : [])))],
    [articles],
  );
  const filtered = category === ALL ? articles : articles.filter((article) => article.category === category);

  return (
    <>
      <LabelledSelect
        label="Category:"
        options={categories}
        value={category}
        onChange={(value) => {
          setCategory(value);
          // A new filter starts the list over rather than keeping the old count.
          setVisible(PAGE_SIZE);
        }}
        className="pb-4 md:pb-7"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
        {filtered.slice(0, visible).map(({ publishedDate, ...article }) => (
          <NewsCard key={article.href} date={formatShortDate(publishedDate)} {...article} />
        ))}
        {visible < filtered.length && (
          <Button
            className="col-span-full mx-auto"
            size="md"
            variant="secondary"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Load More Stories
          </Button>
        )}
      </div>
    </>
  );
}
