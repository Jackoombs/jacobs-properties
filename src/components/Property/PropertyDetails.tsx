import { useState } from "react";
import Copy from "../General/Text/Copy";
import SectionHeader from "../General/Text/SectionHeader";
import PropertyDetailMenu from "./PropertyDetailMenu";

import type { Image } from "../../env";
import type { GoogleMapProps } from "@react-google-maps/api";
import PropertyMap from "./PropertyMap";
import Link from "../General/Link";

interface Props {
  details: {
    Description?: string;
    Floorplan?: Image[];
    EPC?: Image[];
    VirtualTour?: string;
  };
  location: GoogleMapProps["center"];
  address: string;
}

const detailsArray = [
  "Description",
  "Floorplan",
  "EPC",
  "Gallery",
  "Virtual Tour",
] as const;

export type Detail = typeof detailsArray[number];

export default function PropertyDetails({ details, location, address }: Props) {
  const navItems = Object.keys(details)
    .filter(Boolean)
    .map((key) => key.toString() as Detail)
    .filter((key) => detailsArray.includes(key));

  const [currentMenuItem, setCurrentMenuItem] = useState<Detail>(navItems[0]);

  return (
    <>
      <section className="bg-primary-200 pt-4 md:bg-white md:py-0">
        <div className="mx-auto max-w-container-lg">
          <PropertyDetailMenu
            {...{ currentMenuItem, setCurrentMenuItem, navItems }}
          />
        </div>
      </section>

      <section className="bg-primary-200 py-4">
        <div className="mx-auto max-w-container-lg">
          <div className="grid gap-9 py-10 md:gap-12 lg:grid-cols-[5fr_4fr] xl:gap-20">
            <div className="flex flex-col gap-9 md:gap-12 lg:max-w-3xl">
              {currentMenuItem === "Description" && (
                <>
                  <SectionHeader>Full property description</SectionHeader>
                  {details.Description && (
                    <Copy size="md" className="whitespace-pre-line">
                      {details.Description}
                    </Copy>
                  )}
                </>
              )}
              {currentMenuItem === "Floorplan" && (
                <>
                  <SectionHeader>Floorplan</SectionHeader>
                  {details.Floorplan &&
                    details.Floorplan.map((image, index) => (
                      <img
                        key={index}
                        className="w-full self-center rounded-big object-cover"
                        src={image.Filepath}
                        alt={image.Caption}
                      />
                    ))}
                </>
              )}
              {currentMenuItem === "EPC" && (
                <>
                  <SectionHeader>Energy performance certificate</SectionHeader>
                  {details.EPC &&
                    details.EPC.map((image, index) => (
                      <img
                        key={index}
                        className="w-full self-center rounded-big object-cover"
                        src={image.Filepath}
                        alt={image.Caption}
                      />
                    ))}
                </>
              )}
            </div>
            <div>
              <SectionHeader className="pb-9 md:pb-12">Location</SectionHeader>
              <PropertyMap location={location} markers={[location]} />
              <div className="flex flex-col gap-5 py-7 md:flex-row">
                <Link
                  type="primary"
                  link={`https://www.google.com/maps/place/${address.replaceAll(
                    " ",
                    "+"
                  )}`}
                >
                  Get Directions
                </Link>
                <Link type="primary" link="/">
                  Download Brochure
                </Link>
              </div>
              <div className="flex w-full flex-col gap-5 rounded-big bg-secondary-100 px-3 py-8 text-primary-100 md:px-8 lg:p-12">
                <SectionHeader>Interested in this property?</SectionHeader>
                <Copy size="lg">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore.
                </Copy>
                <div className="flex flex-col gap-4 md:flex-row">
                  <Link link="/" type="white" size="lg">
                    Book a viewing
                  </Link>
                  <Link link="/" type="primary" size="lg">
                    Make an offer
                  </Link>
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
        </div>
      </section>
    </>
  );
}
