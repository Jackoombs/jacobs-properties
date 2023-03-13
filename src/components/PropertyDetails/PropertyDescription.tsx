import SectionHeader from "../General/Text/SectionHeader";
import PropertyMap from "../Property/PropertyMap";
import Link from "../General/Link";
import BookAViewingButton from "../Form/BookAViewing/Button";
import MakeAnOfferButton from "../Form/MakeAnOffer/Button";
import type { GoogleMapProps } from "@react-google-maps/api";
import Copy from "../General/Text/Copy";
import type { Property2 } from "../../env";

interface Props {
  address: string;
  location: GoogleMapProps["center"];
  price: string;
  description: string;
  brochure?: string;
  type: Property2["type"];
}

export default function PropertyDescription({
  address,
  location,
  price,
  description,
  brochure,
  type,
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
            link={`https://www.google.com/maps/place/${address.replaceAll(
              " ",
              "+"
            )}`}
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
            If you'd like to book a viewing, click the "Book a Viewing" button
            and select a date and time that works for you. Our team will then
            contact you to confirm the viewing and provide you with any
            additional information you may need
          </Copy>
          <div className="flex flex-col gap-4 xl:flex-row">
            <BookAViewingButton
              price={price}
              address={address}
              variant="white"
              buyOrRent={type === "letting" ? "rent" : "buy"}
            >
              Book a viewing
            </BookAViewingButton>
            {type === "selling" && (
              <MakeAnOfferButton
                address={address}
                variant="primary"
                buyOrRent={"buy"}
              >
                Make an offer
              </MakeAnOfferButton>
            )}
          </div>
          <div className="font-harms">
            <p className="text-lg lg:text-xl">
              Or you can call us on: 01234 567 890
            </p>
            <p className="text-base">We’re open 08:30 – 17:00 today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
