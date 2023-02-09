import type { Property } from "../../env";
import PropertyCard from "./PropertyCard";
import { HiArrowSmLeft } from "react-icons/hi/index.js";
import { RiCloseCircleLine } from "react-icons/ri/index.js";
import Copy from "../General/Text/Copy";
import Link from "../General/Link";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  property: Property;
  setState: React.Dispatch<
    React.SetStateAction<
      google.maps.LatLng | google.maps.LatLngLiteral | undefined
    >
  >;
}

export default function PropertyMapCard({
  property: {
    ID,
    Address1,
    Address2,
    Description,
    PriceString,
    InternalSaleStatus,
    InternalLettingStatus,
    Location,
  },
  setState,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed left-0 top-0 z-[80] h-screen w-max max-w-[100vw] bg-white p-6 lg:absolute lg:m-6 lg:h-min lg:w-full lg:max-w-md lg:rounded-big"
    >
      <div className="flex justify-between pb-8">
        <button className="flex gap-2" onClick={() => setState(undefined)}>
          <HiArrowSmLeft className="text-lg text-secondary-100" />
          <span className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100">
            Go Back
          </span>
        </button>
        <button onClick={() => setState(undefined)}>
          <RiCloseCircleLine className="text-2xl text-primary-100" />
        </button>
      </div>
      <PropertyCard
        {...{ ID, Address1, Address2, PriceString }}
        status={InternalLettingStatus || InternalSaleStatus}
      />
      <Copy size="md" className="my-5 overflow-x-hidden line-clamp-5">
        {Description || ""}
      </Copy>
      <Link
        size="lg"
        link={`properties/${ID}`}
        type="primary"
        className="md:max-w-[6rem]"
      >
        View Property
      </Link>
    </motion.div>
  );
}
