import { useRef, useState } from "react";
import Copy from "@/components/common/Copy";
import PropertyGridView from "@/components/property/PropertyGridView";
import PropertyListView from "@/components/property/PropertyListView";
import PropertyMap from "@/components/property/PropertyMap";
import PropertyMapCard from "@/components/property/PropertyMapCard";
import { isActiveStatus, toLatLng } from "@/lib/property-utils";
import type { LatLngLiteral, Property } from "@/lib/types";
import ViewToggle from "./ViewToggle";
import SortSelect, { type SortOption } from "./SortSelect";

type ViewType = "list" | "grid" | "map";

function sortPropertiesByStatus(properties: Property[]): Property[] {
  const active = properties.filter((p) => isActiveStatus(p.status));
  const other = properties.filter((p) => !isActiveStatus(p.status));
  return [...active, ...other];
}

export default function ViewSection({
  center,
  properties,
  isMobile,
}: {
  center: LatLngLiteral | undefined;
  properties: Property[];
  isMobile: boolean;
}) {
  const [viewType, setViewType] = useState<ViewType>(isMobile ? "grid" : "list");
  const [currMapCardLocation, setCurrMapCardLocation] = useState<LatLngLiteral | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>("Relevant");

  const sortedProperties = (): Property[] => {
    if (sortBy === "Relevant") return sortPropertiesByStatus(properties);
    const sorted = [...properties].sort((a, b) => {
      if (sortBy === "Price (Low-high)") return a.price - b.price;
      if (sortBy === "Price (High-low)") return b.price - a.price;
      if (sortBy === "Address (A-Z)") return (a.address1 ?? "").localeCompare(b.address1 ?? "");
      if (sortBy === "Address (Z-A)") return (b.address1 ?? "").localeCompare(a.address1 ?? "");
      return 0;
    });
    return sorted;
  };

  // PropertyMap tracks the selected marker by object identity (the exact
  // LatLngLiteral instance clicked), and that selection has to survive into
  // later renders — a click sets state, which itself triggers a re-render.
  // toLatLng() builds a new {lat, lng} object every call, so recomputing it
  // fresh each render (as this used to) meant the object captured at click
  // time could never strictly-equal anything in the next render's freshly
  // rebuilt list — the lookup below always missed. Cache one stable object
  // per property id instead, so the reference is the same on every render.
  const latLngCache = useRef(new Map<string, LatLngLiteral>());
  const getLatLng = (property: Property): LatLngLiteral | undefined => {
    const cached = latLngCache.current.get(property.id);
    if (cached) return cached;
    const computed = toLatLng(property.location);
    if (computed) latLngCache.current.set(property.id, computed);
    return computed;
  };

  const visible = sortedProperties();
  const withLatLng = visible.map((property) => ({ property, latLng: getLatLng(property) }));
  const currentMapProperty = withLatLng.find((p) => p.latLng === currMapCardLocation)?.property;

  return (
    <>
      <div className="mx-auto grid w-full max-w-container-lg grid-cols-2 grid-rows-2 items-center justify-between pb-4 lg:flex lg:gap-36 lg:pb-10">
        <Copy className="order-1 text-right lg:order-none" size="lg">
          {properties.length} {properties.length === 1 ? "property" : "properties"}
        </Copy>
        <SortSelect setState={setSortBy} className="col-span-2 pb-4 lg:flex-1 lg:pb-0" />
        <ViewToggle state={viewType} setState={setViewType} isMobile={isMobile} />
      </div>
      {viewType === "grid" && <PropertyGridView properties={visible} />}
      {viewType === "list" && <PropertyListView properties={visible} />}
      {viewType === "map" && (
        <div className="mx-auto max-w-container-lg">
          <PropertyMap
            zoom={12}
            markers={withLatLng.map((p) => p.latLng)}
            location={center}
            state={currMapCardLocation}
            setState={setCurrMapCardLocation}
          >
            {currentMapProperty && (
              <PropertyMapCard setState={setCurrMapCardLocation} property={currentMapProperty} />
            )}
          </PropertyMap>
        </div>
      )}
    </>
  );
}
