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
import PropertyMap from "../Property/PropertyMap";
import PropertyMapCard from "../Property/PropertyMapCard";

interface Props {
  properties: Property[];
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
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

export default function PropertySearch({ properties, center }: Props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [currMapCardLocation, setCurrMapCardLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >(undefined);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const [viewType, setViewType] = useState<"list" | "grid" | "map">(
    // width < 1024 ? "grid" : "list"
    "grid"
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
  const currentMapProperty = filteredProperties.find(
    (property) => property.Location === currMapCardLocation
  );

  return (
    <>
      <section className="justify-center py-10 md:flex md:py-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col items-center gap-[34px]">
          <Display>Start your search</Display>
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
            className="order-1 lg:order-none"
            size="lg"
          >{`${filteredProperties.length} properties`}</Copy>
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
        {viewType === "map" && (
          <div className="mx-auto max-w-container-lg">
            <PropertyMap
              zoom={12}
              markers={filteredProperties.map((property) => property.Location)}
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
    </>
  );
}
