import { useEffect, useState } from "react";
import Display from "../General/Text/Display";
import PropertySearchForm from "./PropertySearchForm";
import type { Property } from "../../env";
import { priceStringToPriceNumber } from "../../utils";
import Fuse from "fuse.js";
import PropertyGridView from "../Property/PropertyGridView";
import PropertyListView from "../Property/PropertyListView";
import { ViewToggle } from "../Property/ViewToggle";
import Copy from "../General/Text/Copy";

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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const [viewType, setViewType] = useState<"list" | "grid" | "map">(
    width < 1024 ? "grid" : "list"
  );

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
      return fuseResult.map((result) => result.item);
    }
    return result;
  };

  const filteredProperties = filterProperties(properties, searchCriteria);

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

      <section className="overflow-hidden py-10 md:pb-28">
        <div className="mx-auto flex w-full max-w-container-lg items-center justify-between pb-8 lg:pb-10">
          <Copy
            addClasses="order-1 lg:order-none"
            size="lg"
            text={`${filteredProperties.length} properties`}
          />
          {width < 1024 && (
            <ViewToggle
              state={viewType}
              setState={setViewType}
              isMobile={true}
            />
          )}
          {width > 1023 && (
            <ViewToggle
              state={viewType}
              setState={setViewType}
              isMobile={false}
            />
          )}
        </div>
        {viewType === "grid" && (
          <PropertyGridView properties={filteredProperties} />
        )}
        {viewType === "list" && (
          <PropertyListView properties={filteredProperties} />
        )}
      </section>
    </>
  );
}
