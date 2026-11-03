import { useState } from "react";
import Button from "@/components/common/Button";
import type { Property } from "@/lib/types";
import PropertyListCard from "./PropertyListCard";

export default function PropertyListView({ properties }: { properties: Property[] }) {
  const [maxProperties, setMaxProperties] = useState(10);

  return (
    <div className="mx-auto flex w-full max-w-container-lg flex-col gap-16">
      {properties.slice(0, maxProperties).map((property) => (
        <PropertyListCard key={property.id} property={property} />
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
