import type { newsCardType } from "./NewsSlider";
import NewsCard from "./NewsCard";
import { useState } from "react";
import { removeArrayDuplicates } from "../../utils";
import SortInput from "../Form/SortInput";

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
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
        {sortedNews
          .slice(0, maxPosts)
          .map(({ title, category, date, image }, index) => (
            <NewsCard key={index} {...{ title, category, date, image }} />
          ))}
        {maxPosts < sortedNews.length && (
          <button
            className="col-span-full mx-auto flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 px-6 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-auto md:min-w-[10rem]"
            onClick={() => setMaxPosts((value) => (value += 12))}
          >
            Load More Stories
          </button>
        )}
      </div>
    </>
  );
}
