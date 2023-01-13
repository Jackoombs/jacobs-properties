import { useState } from "react";
import Display from "../General/Text/Display";
import PropertySearchForm from "./PropertySearchForm";
import type { Property } from "../../env";
import PropertyCard from "../Property/PropertyCard";
import { priceStringToPriceNumber } from "../../utils";
import Fuse from "fuse.js";

interface Props {
  properties: Property[];
}

export interface SearchCriteria {
  isBuyRent: boolean;
  location: string | undefined;
  minBeds: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  propertyType: "House" | "Apartment" | "Bungalow" | "Commerical" | undefined;
  excludeSoldOffer: boolean;
}

export default function PropertySearch({ properties }: Props) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    isBuyRent: false,
    location: undefined,
    minBeds: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    propertyType: undefined,
    excludeSoldOffer: false,
  });

  const filterProperties = (
    properties: Property[],
    searchCriteria: SearchCriteria
  ): Property[] => {
    let result: Property[] = properties
      .filter((property) => {
        if (
          (searchCriteria.isBuyRent && property.InternalLettingStatus) ||
          (!searchCriteria.isBuyRent && property.InternalSaleStatus)
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
        if (!searchCriteria.excludeSoldOffer) return true;
        if (
          searchCriteria.excludeSoldOffer &&
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
      console.log(
        fuseResult.map(
          (result) => `${result.item.Address1}, ${result.item.Address2}`
        )
      );
      return fuseResult.map((result) => result.item);
    }
    return result;
  };

  return (
    <>
      <section className="justify-center py-10 md:flex md:py-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col items-center gap-[34px]">
          <Display text="Start your search" />
          <PropertySearchForm {...{ setSearchCriteria }} />
        </div>
      </section>
      {/* <section className="justify-center py-10 md:flex md:pb-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col">
          <div>
            Sort by: Price (High-low) <span></span>
          </div>
        </div>
      </section> */}

      <section className="justify-center py-10 md:flex md:pb-28">
        <div className="mx-auto grid w-full max-w-container-lg grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
          {filterProperties(properties, searchCriteria).map(
            ({
              ID,
              Address1,
              Address2,
              PriceString,
              InternalLettingStatus,
              InternalSaleStatus,
            }) => (
              <PropertyCard
                key={ID}
                {...{ ID, Address1, Address2, PriceString }}
                status={InternalLettingStatus || InternalSaleStatus}
              />
            )
          )}
        </div>
      </section>
    </>
  );
}
