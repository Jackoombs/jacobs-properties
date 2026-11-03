import { useState } from "react";
import Button from "@/components/common/Button";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

export default function PropertyGridView({ properties }: { properties: Property[] }) {
  const [maxProperties, setMaxProperties] = useState(12);

  return (
    <div className="mx-auto grid w-full max-w-container-lg grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
      {properties.slice(0, maxProperties).map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {maxProperties < properties.length && (
        <Button
          className="col-span-full mx-auto"
          size="md"
          onClick={() => setMaxProperties((value) => value + 12)}
          variant="secondary"
        >
          Load More
        </Button>
      )}
    </div>
  );
}
