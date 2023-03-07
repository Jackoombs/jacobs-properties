import { useState } from "react";
import type { Property2 } from "../../env";
import PropertyListCard from "./PropertyListCard";
import Button from "../General/Button";

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
  );
}
