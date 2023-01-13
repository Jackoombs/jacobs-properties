import type { Property } from "../../env";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property[];
}
export default function PropertyGridView({ properties }: Props) {
  return (
    <div className="mx-auto grid w-full max-w-container-lg grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
      {properties.map(
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
  );
}
