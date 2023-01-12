import { useState } from "react";
import Display from "../General/Text/Display";
import PropertySearchForm from "./PropertySearchForm";
import type { Property } from "../../env";

interface Props {
  properties: Property[];
}

export interface SearchData {
  isBuyRent: boolean;
  location: string | undefined;
  minBeds: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  propertyType: "House" | "Apartment" | "Bungalow" | "Commerical" | undefined;
  excludeSoldOffer: boolean;
}

export default function PropertySearch({ properties }: Props) {
  const [data, setData] = useState<SearchData | undefined>();

  return (
    <>
      <section className="justify-center py-10 md:flex md:pb-40 md:pt-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col items-center gap-[34px]">
          <Display text="Start your search" />
          <PropertySearchForm {...{ setData }} />
        </div>
      </section>
      {/* <section className="justify-center py-10 md:flex md:pb-28">
        <div className="mx-auto flex w-full max-w-container-lg flex-col">
          <div>
            Sort by: Price (High-low) <span></span>
          </div>
        </div>
      </section> */}
    </>
  );
}
