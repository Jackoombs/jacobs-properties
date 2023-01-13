import type { Property } from "../../env";
import PropertyListCard from "./PropertyListCard";

interface Props {
  properties: Property[];
}
export default function PropertyListView({ properties }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-container-lg flex-col gap-16">
      {properties.map(
        ({
          ID,
          Address1,
          Address2,
          PriceString,
          TotalBedrooms,
          Bathrooms,
          InternalLettingStatus,
          InternalSaleStatus,
          Image,
        }) => (
          <PropertyListCard
            key={ID}
            {...{
              ID,
              Address1,
              Address2,
              PriceString,
              TotalBedrooms,
              Bathrooms,
              Image,
            }}
            status={InternalLettingStatus || InternalSaleStatus}
          />
        )
      )}
    </div>
  );
}
