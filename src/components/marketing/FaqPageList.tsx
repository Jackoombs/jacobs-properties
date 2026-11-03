import { useEffect, useMemo, useState } from "react";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import Button from "@/components/common/Button";
import { cn } from "@/lib/utils";

type Category = "buyers" | "sellers" | "landlords" | "tenants";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: Category;
}

interface Props {
  faqs: Faq[];
}

const CATEGORIES: Category[] = ["buyers", "sellers", "landlords", "tenants"];

const PAGE_SIZE = 3;

export default function FaqPageList({ faqs }: Props) {
  const [category, setCategory] = useState<Category>("buyers");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const byCategory = useMemo(() => {
    const map: Record<Category, Faq[]> = { buyers: [], sellers: [], landlords: [], tenants: [] };
    for (const faq of faqs) map[faq.category]?.push(faq);
    return map;
  }, [faqs]);

  // Switching category starts the list over rather than carrying the
  // previous tab's expanded count across.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category]);

  const current = byCategory[category] ?? [];

  return (
    <>
      <ul className="flex gap-4 pb-4 md:justify-center md:gap-12 md:pb-12">
        {CATEGORIES.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "text-xs font-semibold uppercase tracking-[1.4px] text-primary-100 decoration-secondary-100 decoration-2 underline-offset-8 sm:text-sm sm:tracking-[2.8px]",
                category === item && "underline",
              )}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <FaqAccordion faqs={current.slice(0, visible)} cardBg="bg-primary-200" />

      {visible < current.length && (
        <Button
          size="md"
          variant="secondary"
          className="mx-auto mt-6"
          onClick={() => setVisible((value) => value + 10)}
        >
          View More
        </Button>
      )}
    </>
  );
}
