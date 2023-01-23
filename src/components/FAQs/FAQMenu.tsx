import { useState } from "react";
import FAQMenuItem from "./FAQMenuItem";

export type FAQCategory = "Buyers" | "Sellers" | "Landlords" | "Tenants";

export default function FAQMenu() {
  const [currentItem, setCurrentItem] = useState<FAQCategory>("Buyers");

  const menuItems: FAQCategory[] = [
    "Buyers",
    "Sellers",
    "Landlords",
    "Tenants",
  ];

  return (
    <ul className="flex gap-4 md:justify-center md:gap-12">
      {menuItems.map((item) => (
        <FAQMenuItem key={item} {...{ currentItem, setCurrentItem }}>
          {item}
        </FAQMenuItem>
      ))}
    </ul>
  );
}
