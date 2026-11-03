import { useCallback, useState } from "react";
import { Display } from "@/components/common/Text";
import AlertBar from "@/components/forms/early-bird/AlertBar";
import { isActiveStatus } from "@/lib/property-utils";
import type { LatLngLiteral, Property } from "@/lib/types";
import SearchForm from "./SearchForm";
import ViewSection from "./ViewSection";
import { DEFAULT_SEARCH_CRITERIA, type SearchCriteria } from "./SearchCriteria";

function filterProperties(properties: Property[], criteria: SearchCriteria): Property[] {
  return properties
    .filter((p) =>
      criteria.buyOrRent === "rent" ? p.marketingMode === "letting" : p.marketingMode === "selling",
    )
    .filter((p) => !criteria.minBeds || (p.bedrooms ?? 0) >= criteria.minBeds)
    .filter(
      (p) =>
        (!criteria.minPrice || p.price >= criteria.minPrice) &&
        (!criteria.maxPrice || p.price <= criteria.maxPrice),
    )
    .filter((p) => !criteria.excludeSold || isActiveStatus(p.status));
}

export default function PropertySearch({
  properties,
  center,
}: {
  properties: Property[];
  center: LatLngLiteral | undefined;
}) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(DEFAULT_SEARCH_CRITERIA);

  const handleSearchCriteria = useCallback((criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  }, []);

  const filteredProperties = filterProperties(properties, searchCriteria);

  return (
    <>
      <section className="relative justify-center pb-10 md:flex md:pt-28">
        <AlertBar />
        <div className="mx-auto flex w-full max-w-container-lg flex-col items-center gap-[34px]">
          <Display>Start your search</Display>
          <SearchForm setSearchCriteria={handleSearchCriteria} />
        </div>
      </section>
      <section className="overflow-hidden pb-10 md:pb-28 lg:hidden">
        <ViewSection properties={filteredProperties} isMobile center={center} />
      </section>
      <section className="hidden overflow-hidden pb-10 md:pb-28 lg:block">
        <ViewSection properties={filteredProperties} isMobile={false} center={center} />
      </section>
    </>
  );
}
