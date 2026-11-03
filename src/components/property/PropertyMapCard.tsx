import { ArrowLeft, CircleX } from "lucide-react";
import Copy from "@/components/common/Copy";
import Link from "@/components/common/Link";
import type { LatLngLiteral, Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

export default function PropertyMapCard({
  property,
  setState,
}: {
  property: Property;
  setState: (marker: LatLngLiteral | undefined) => void;
}) {
  const { description, id } = property;

  return (
    <div className="fixed left-0 top-0 z-[80] h-screen w-max max-w-[100vw] overflow-y-auto bg-white p-6 lg:absolute lg:z-30 lg:m-6 lg:h-min lg:w-full lg:max-w-md lg:rounded-big">
      <div className="flex justify-between pb-8">
        <button className="flex gap-2" onClick={() => setState(undefined)}>
          <ArrowLeft className="size-5 text-secondary-100" />
          <span className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100">
            Go Back
          </span>
        </button>
        <button onClick={() => setState(undefined)} aria-label="Close">
          <CircleX className="size-6 text-primary-100" />
        </button>
      </div>
      <PropertyCard property={property} />
      <Copy size="md" className="my-5 line-clamp-5 overflow-x-hidden">
        {description || ""}
      </Copy>
      <Link size="lg" link={`/properties/${id}`} type="primary" className="md:max-w-[6rem]">
        View Property
      </Link>
    </div>
  );
}
