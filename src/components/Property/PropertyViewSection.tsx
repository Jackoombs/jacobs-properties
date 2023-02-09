import Copy from "../General/Text/Copy";
import { ViewToggle } from "./ViewToggle";
import PropertyGridView from "./PropertyGridView";
import PropertyListView from "./PropertyListView";
import PropertyMap from "./PropertyMap";
import PropertyMapCard from "./PropertyMapCard";
import { useState } from "react";
import type { Property } from "../../env";
import { getNumberFromPriceString } from "../../utils";
import SortInput from "../Form/SortInput";

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
  const [sortBy, setSortBy] = useState<
    | "Relevant"
    | "Address (A-Z)"
    | "Address (Z-A)"
    | "Price (Low-high)"
    | "Price (High-low)"
  >("Relevant");

  const currentMapProperty = properties.find(
    (property) => property.Location === currMapCardLocation
  );

  const sortedData = [...properties].sort((a, b): any => {
    const numberA = getNumberFromPriceString(a.PriceString);
    const numberB = getNumberFromPriceString(b.PriceString);
    if (!numberA || !numberB) return;
    if (sortBy === "Price (Low-high)") {
      return numberA - numberB;
    } else if (sortBy === "Address (A-Z)") {
      return a.Address1.localeCompare(b.Address1);
    } else if (sortBy === "Address (Z-A)") {
      return b.Address1.localeCompare(a.Address1);
    } else if (sortBy === "Price (High-low)") {
      return numberB - numberA;
    } else return properties;
  });

  return (
    <section className="overflow-hidden py-10 md:pb-28">
      <div className="mx-auto grid w-full max-w-container-lg grid-cols-2 grid-rows-2 items-center justify-between pb-4 lg:flex lg:gap-36 lg:pb-10">
        <Copy className="order-1 text-right lg:order-none" size="lg">{`${
          properties.length
        } ${properties.length === 1 ? "property" : "properties"}`}</Copy>
        <SortInput
          name="sortOptions"
          label="Sort by: "
          options={[
            "Relevant",
            "Address (A-Z)",
            "Address (Z-A)",
            "Price (Low-high)",
            "Price (High-low)",
          ]}
          setState={setSortBy}
          className="col-span-2 pb-4 lg:flex-1 lg:pb-0"
        />
        <ViewToggle
          state={viewType}
          setState={setViewType}
          isMobile={isMobile}
        />
      </div>
      {viewType === "grid" && <PropertyGridView properties={sortedData} />}
      {viewType === "list" && <PropertyListView properties={sortedData} />}
      {viewType === "map" && (
        <div className="mx-auto max-w-container-lg">
          <PropertyMap
            zoom={12}
            markers={sortedData.map((property) => property.Location)}
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
