import { useEffect, useState } from "react";
import Display from "../General/Text/Display";
import PropertySearchForm from "./PropertySearchForm";
import type { Property2 } from "../../env";
import Fuse from "fuse.js";
import PropertyViewSection from "../Property/PropertyViewSection";

interface Props {
  properties: Property2[];
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
}

export interface SearchCriteria {
  buyOrRent: "buy" | "rent";
  location: string | undefined;
  minBeds: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  propertyType: "House" | "Apartment" | "Bungalow" | "Commerical" | undefined;
  excludeSold: boolean;
}

export default function PropertySearch({ properties, center }: Props) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    buyOrRent: "buy",
    location: undefined,
    minBeds: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    propertyType: undefined,
    excludeSold: false,
  });

  useEffect(() => {
    const buyOrRent: string | null = window.sessionStorage.getItem("buyOrRent");
    const location: string | null = window.sessionStorage.getItem("location");
    const newSearchCriteria = { ...searchCriteria };
    newSearchCriteria.buyOrRent =
      buyOrRent === "buy" || buyOrRent === "rent" ? buyOrRent : "buy";
    newSearchCriteria.location = location ? location : undefined;
    setSearchCriteria(newSearchCriteria);
  }, []);

  const filterProperties = (
    properties: Property2[],
    searchCriteria: SearchCriteria
  ): Property2[] => {
    let result: Property2[] = properties
      .filter((p) => {
        if (
          (searchCriteria.buyOrRent === "rent" && p.type === "letting") ||
          (searchCriteria.buyOrRent === "buy" && p.type === "selling")
        ) {
          return true;
        }
      })
      .filter((p) => {
        if (!searchCriteria.minBeds || p.bedrooms >= searchCriteria.minBeds) {
          return true;
        }
      })
      .filter((p) => {
        if (
          (!searchCriteria.minPrice || p.price >= searchCriteria.minPrice) &&
          (!searchCriteria.maxPrice || p.price <= searchCriteria.maxPrice)
        ) {
          return true;
        }
      })
      .filter((p) => {
        if (!searchCriteria.excludeSold) return true;
        if (
          searchCriteria.excludeSold &&
          (p.status === "forSale" || p.status === "toLet")
        ) {
          return true;
        }
      });

    // if (searchCriteria.location) {
    //   const options = {
    //     includeScore: true,
    //     threshold: 0.4,
    //     keys: ["address1", "address2"],
    //   };
    //   const fuse = new Fuse(result, options);
    //   const fuseResult = fuse.search(searchCriteria.location);
    //   return fuseResult.map((result) => result.item);
    // }
    return result;
  };

  const filteredProperties = filterProperties(properties, searchCriteria);

  return (
    <>
      <section className="justify-center py-10 md:flex md:pt-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col items-center gap-[34px]">
          <Display>Start your search</Display>
          <PropertySearchForm {...{ setSearchCriteria }} />
        </div>
      </section>
      <section className="overflow-hidden py-10 md:pb-28 lg:hidden">
        <PropertyViewSection
          properties={filteredProperties}
          isMobile={true}
          {...{ center }}
        />
      </section>
      <section className="hidden overflow-hidden py-10 md:pb-28 lg:block">
        <PropertyViewSection
          properties={filteredProperties}
          isMobile={false}
          {...{ center }}
        />
      </section>
    </>
  );
}
