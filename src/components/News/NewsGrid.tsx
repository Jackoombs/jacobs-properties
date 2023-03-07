import type { newsCardType } from "./NewsSlider";
import NewsCard from "./NewsCard";
import { useState } from "react";
import { removeArrayDuplicates } from "../../utils";
import SortInput from "../Form/SortInput";
import Button from "../General/Button";

interface Props {
  newsTemplate: newsCardType[];
}

export default function NewsGrid({ newsTemplate }: Props) {
  const categoryArray = removeArrayDuplicates(
    newsTemplate.map((e) => e.category)
  );
  const [category, setCategory] = useState("All");
  const [maxPosts, setMaxPosts] = useState(12);

  const sortNews = (array: newsCardType[], currentCategory: String) => {
    if (currentCategory === "All") {
      return newsTemplate;
    } else {
      return newsTemplate.filter(
        ({ category }) => category === currentCategory
      );
    }
  };
  const sortedNews = sortNews(newsTemplate, category);

  return (
    <>
      <SortInput
        options={["All", ...categoryArray]}
        label="Category:"
        name="category"
        setState={setCategory}
        className="pb-4 md:pb-7"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
        {sortedNews
          .slice(0, maxPosts)
          .map(({ title, category, date, image }, index) => (
            <NewsCard key={index} {...{ title, category, date, image }} />
          ))}
        {maxPosts < sortedNews.length && (
          <Button
            className="col-span-full mx-auto"
            size="md"
            onClick={() => setMaxPosts((value) => (value += 12))}
            variant="secondary"
          >
            Load More Stories
          </Button>
        )}
      </div>
    </>
  );
}
