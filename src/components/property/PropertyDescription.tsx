import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import Link from "@/components/common/Link";
import PropertyMap from "./PropertyMap";
import BookAViewingButton from "@/components/forms/book-a-viewing/BookAViewingButton";
import MakeAnOfferButton from "@/components/forms/make-an-offer/MakeAnOfferButton";
import type { LatLngLiteral, MarketingMode } from "@/lib/types";

interface Props {
  address: string;
  location: LatLngLiteral | undefined;
  price: number;
  description: string;
  brochure?: string;
  marketingMode: MarketingMode;
  propertyId: string;
}

export default function PropertyDescription({
  address,
  location,
  price,
  description,
  brochure,
  marketingMode,
  propertyId,
}: Props) {
  return (
    <div className="grid gap-9 py-10 md:gap-12 lg:grid-cols-[5fr_4fr] xl:gap-20">
      <div className="flex flex-col gap-9 md:gap-12 lg:max-w-3xl">
        <SectionHeader>Full property description</SectionHeader>
        <Copy size="md" className="whitespace-pre-line">
          {description}
        </Copy>
      </div>
      <div>
        <SectionHeader className="pb-9 md:pb-12">Location</SectionHeader>
        <PropertyMap location={location} markers={[location]} />
        <div className="flex flex-col gap-5 py-7 md:flex-row">
          <Link
            newTab
            type="primary"
            link={`https://www.google.com/maps/place/${address.replaceAll(" ", "+")}`}
          >
            Get Directions
          </Link>
          {brochure && (
            <Link type="primary" link={brochure}>
              Download Brochure
            </Link>
          )}
        </div>
        <div className="flex w-full flex-col gap-5 rounded-big bg-secondary-100 px-3 py-8 text-primary-100 md:px-8 lg:p-12">
          <SectionHeader>Interested in this property?</SectionHeader>
          <Copy size="lg">
            If you'd like to book a viewing, click the "Book a Viewing" button and select a date
            and time that works for you. Our team will then contact you to confirm the viewing
            and provide you with any additional information you may need
          </Copy>
          <div className="flex flex-col gap-4 xl:flex-row">
            <BookAViewingButton
              price={price}
              address={address}
              propertyId={propertyId}
              variant="white"
              buyOrRent={marketingMode === "letting" ? "rent" : "buy"}
            >
              Book a viewing
            </BookAViewingButton>
            {marketingMode === "selling" && (
              <MakeAnOfferButton address={address} propertyId={propertyId} variant="primary" buyOrRent="buy">
                Make an offer
              </MakeAnOfferButton>
            )}
          </div>
          <div className="font-harm">
            <p className="text-lg lg:text-xl">Or you can call us on: 01256 781300</p>
            <p className="text-base">We're open 08:30 – 17:00 today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
