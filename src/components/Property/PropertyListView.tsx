import { useState } from "react";
import type { Property2 } from "../../env";
import PropertyListCard from "./PropertyListCard";

interface Props {
  properties: Property2[];
}
export default function PropertyListView({ properties }: Props) {
  const [maxProperties, setMaxProperties] = useState(10);

  return (
    <div className="mx-auto flex w-full max-w-container-lg flex-col gap-16">
      {properties.slice(0, maxProperties).map((property) => (
        <PropertyListCard key={property.id} {...{ property }} />
      ))}
      {maxProperties < properties.length && (
        <button
          className="mx-auto flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-auto md:min-w-[10rem]"
          onClick={() => setMaxProperties((value) => (value += 10))}
        >
          Load More
        </button>
      )}
    </div>
  );
}
