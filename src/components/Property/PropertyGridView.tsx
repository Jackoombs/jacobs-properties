import { useState } from "react";
import type { Property2 } from "../../env";
import Button from "../General/Button";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property2[];
}
export default function PropertyGridView({ properties }: Props) {
  const [maxProperties, setMaxProperties] = useState(12);

  return (
    <>
      <div className="mx-auto grid w-full max-w-container-lg grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
        {properties.slice(0, maxProperties).map((property) => (
          <PropertyCard key={property.id} {...{ property }} />
        ))}
        {maxProperties < properties.length && (
          <Button
            className="col-span-full mx-auto"
            size="md"
            onClick={() => setMaxProperties((value) => (value += 12))}
            variant="secondary"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
