import Copy from "../General/Text/Copy";
import { ViewToggle } from "./ViewToggle";
import PropertyGridView from "./PropertyGridView";
import PropertyListView from "./PropertyListView";
import PropertyMap from "./PropertyMap";
import PropertyMapCard from "./PropertyMapCard";
import { useState } from "react";
import type { Property } from "../../env";

interface Props {
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  properties: Property[];
  isMobile: boolean;
}

export default function PropertyViewSection({
  center,
  properties,
  isMobile,
}: Props) {
  const [viewType, setViewType] = useState<"list" | "grid" | "map">(
    isMobile ? "grid" : "list"
  );
  const [currMapCardLocation, setCurrMapCardLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >(undefined);

  const currentMapProperty = properties.find(
    (property) => property.Location === currMapCardLocation
  );

  return (
    <section className="overflow-hidden py-10 md:pb-28">
      <div className="mx-auto flex w-full max-w-container-lg items-center justify-between pb-8 lg:pb-10">
        <Copy
          className="order-1 lg:order-none"
          size="lg"
        >{`${properties.length} properties`}</Copy>
        <ViewToggle
          state={viewType}
          setState={setViewType}
          isMobile={isMobile}
        />
      </div>
      {viewType === "grid" && <PropertyGridView {...{ properties }} />}
      {viewType === "list" && <PropertyListView {...{ properties }} />}
      {viewType === "map" && (
        <div className="mx-auto max-w-container-lg">
          <PropertyMap
            zoom={12}
            markers={properties.map((property) => property.Location)}
            location={center}
            state={currMapCardLocation}
            setState={setCurrMapCardLocation}
          >
            {currentMapProperty && (
              <PropertyMapCard
                setState={setCurrMapCardLocation}
                property={currentMapProperty}
              />
            )}
          </PropertyMap>
        </div>
      )}
    </section>
  );
}
