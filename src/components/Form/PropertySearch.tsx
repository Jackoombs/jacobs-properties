import { useEffect, useState } from "react";
import Display from "../General/Text/Display";
import PropertySearchForm from "./PropertySearchForm";
import type { Property } from "../../env";
import { priceStringToPriceNumber } from "../../utils";
import Fuse from "fuse.js";
import PropertyViewSection from "../Property/PropertyViewSection";

interface Props {
  properties: Property[];
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  params?: {
    location: string;
    buyOrRent: "buy" | "rent";
  };
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

export default function PropertySearch({ properties, center, params }: Props) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    buyOrRent: params?.buyOrRent || "buy",
    location: params?.location,
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
    properties: Property[],
    searchCriteria: SearchCriteria
  ): Property[] => {
    let result: Property[] = properties
      .filter((property) => {
        if (
          (searchCriteria.buyOrRent === "rent" &&
            property.InternalLettingStatus) ||
          (searchCriteria.buyOrRent === "buy" && property.InternalSaleStatus)
        ) {
          return true;
        }
      })
      .filter((property) => {
        if (
          !searchCriteria.minBeds ||
          property.TotalBedrooms >= searchCriteria.minBeds
        ) {
          return true;
        }
      })
      .filter((property) => {
        const price = priceStringToPriceNumber(property.PriceString);
        if (
          (!searchCriteria.minPrice || price >= searchCriteria.minPrice) &&
          (!searchCriteria.maxPrice || price <= searchCriteria.maxPrice)
        ) {
          return true;
        }
      })
      .filter((property) => {
        const status =
          property.InternalLettingStatus || property.InternalSaleStatus;
        if (!searchCriteria.excludeSold) return true;
        if (
          searchCriteria.excludeSold &&
          (status === "For Sale - Available" ||
            status === "To Let - Available" ||
            status === "Tenancy Current - Available")
        ) {
          return true;
        }
      });

    if (searchCriteria.location) {
      const options = {
        includeScore: true,
        threshold: 0.4,
        keys: ["Address1", "Address2"],
      };
      const fuse = new Fuse(result, options);
      const fuseResult = fuse.search(searchCriteria.location);
      return fuseResult.map((result) => result.item);
    }
    return result;
  };

  const filteredProperties = filterProperties(properties, searchCriteria);

  return (
    <>
      <section className="justify-center py-10 md:flex md:py-28">
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
