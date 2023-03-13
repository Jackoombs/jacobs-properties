import Copy from "../General/Text/Copy";
import { ViewToggle } from "../Property/ViewToggle";
import PropertyGridView from "../Property/PropertyGridView";
import PropertyListView from "../Property/PropertyListView";
import PropertyMap from "../Property/PropertyMap";
import PropertyMapCard from "../Property/PropertyMapCard";
import { useState } from "react";
import type { Property2 } from "../../env";
import SortInput from "../Form/SortInput";

interface Props {
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  properties: Property2[];
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
    (p) => p.location === currMapCardLocation
  );

  function sortPropertiesByStatus(properties: Property2[]): Property2[] {
    const forSaleOrToLetProperties = properties.filter(
      (property) =>
        property.status === "forSale" ||
        property.status === "toLet" ||
        property.status === "tenancyCurrent"
    );
    const otherProperties = properties.filter(
      (property) =>
        property.status !== "forSale" &&
        property.status !== "toLet" &&
        property.status !== "tenancyCurrent"
    );
    return [...forSaleOrToLetProperties, ...otherProperties];
  }

  const sortedProperties = () => {
    let sortedProperties: Property2[] = [];
    if (sortBy === "Relevant") {
      sortedProperties = sortPropertiesByStatus(properties);
    } else {
      sortedProperties = [...properties].sort((a, b): any => {
        if (!a.price || !b.price) return properties;
        if (sortBy === "Price (Low-high)") {
          return a.price - b.price;
        } else if (sortBy === "Address (A-Z)") {
          return a.address1.localeCompare(b.address1);
        } else if (sortBy === "Address (Z-A)") {
          return b.address1.localeCompare(a.address1);
        } else if (sortBy === "Price (High-low)") {
          return b.price - a.price;
        }
      });
    }
    return sortedProperties;
  };

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
      {viewType === "grid" && (
        <PropertyGridView properties={sortedProperties()} />
      )}
      {viewType === "list" && (
        <PropertyListView properties={sortedProperties()} />
      )}
      {viewType === "map" && (
        <div className="mx-auto max-w-container-lg">
          <PropertyMap
            zoom={12}
            markers={sortedProperties().map((p) => p.location)}
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
