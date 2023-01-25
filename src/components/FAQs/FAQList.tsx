import { useEffect, useState } from "react";
import type { Client } from "../../env";
import FAQMenuItem from "./FAQMenuItem";
import FAQs from "./FAQs";
import FAQJson from "./FAQS.json";

export default function FAQList() {
  const [currentItem, setCurrentItem] = useState<Client>("buyers");
  const [maxFAQs, setMaxFAQs] = useState(3);

  const menuItems: Client[] = ["buyers", "sellers", "landlords", "tenants"];

  useEffect(() => {
    setMaxFAQs(3);
  }, [currentItem]);

  return (
    <>
      <ul className="flex gap-4 pb-4 md:justify-center md:gap-12 md:pb-12">
        {menuItems.map((item) => (
          <FAQMenuItem key={item} {...{ currentItem, setCurrentItem }}>
            {item}
          </FAQMenuItem>
        ))}
      </ul>
      <FAQs category={currentItem} bgColor="bg-primary-200" maxFAQs={maxFAQs} />
      {maxFAQs < FAQJson[currentItem].length && (
        <button
          className="col-span-full mx-auto mt-6 flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 px-6 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-auto md:min-w-[10rem] xl:mt-16"
          onClick={() => setMaxFAQs((value) => (value += 10))}
        >
          View More
        </button>
      )}
    </>
  );
}
