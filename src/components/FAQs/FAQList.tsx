import { useEffect, useState } from "react";
import type { Client } from "../../env";
import Button from "../General/Button";
import FAQMenuItem from "./FAQMenuItem";
import FAQs from "./FAQs";
import { faqTemplate } from "./faqTemplate";

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
      <FAQs client={currentItem} bgColor="bg-primary-200" maxFAQs={maxFAQs} />
      {maxFAQs < faqTemplate[currentItem].length && (
        <Button
          size="md"
          className="col-span-full mx-auto mt-6"
          onClick={() => setMaxFAQs((value) => (value += 10))}
          variant="secondary"
        >
          View More
        </Button>
      )}
    </>
  );
}
