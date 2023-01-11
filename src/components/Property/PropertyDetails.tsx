import { useState } from "react";
import Copy from "../General/Text/Copy";
import SectionHeader from "../General/Text/SectionHeader";
import PropertyDetailMenu from "./PropertyDetailMenu";

import type { Image } from "../../env";
import type { GoogleMapProps } from "@react-google-maps/api";
import PropertyMap from "./PropertyMap";
import Link from "../General/Link";

interface Props {
  Description: string;
  location: GoogleMapProps["center"];
  Floorplan?: Image;
  EPC?: Image;
}

export default function PropertyDetails({
  Description,
  location,
  Floorplan,
  EPC,
}: Props) {
  const [currentMenuItem, setCurrentMenuItem] = useState<
    "Description" | "Floorplan" | "EPC" | "Gallery" | "Virtual Tour"
  >("Description");

  return (
    <>
      <section className="bg-primary-200 pt-4 md:bg-white md:py-0">
        <div className="mx-auto max-w-container-lg">
          <PropertyDetailMenu {...{ currentMenuItem, setCurrentMenuItem }} />
        </div>
      </section>

      <section className="bg-primary-200 py-4">
        <div className="mx-auto max-w-container-lg">
          <div className="grid gap-9 py-10 md:gap-12 lg:grid-cols-[5fr_4fr] xl:gap-44">
            <div className="flex flex-col gap-9 md:gap-12 lg:max-w-3xl">
              {currentMenuItem === "Description" && (
                <>
                  <SectionHeader text="Full property description" />
                  <Copy size="md" text={Description} />
                </>
              )}
              {currentMenuItem === "Floorplan" && (
                <>
                  <SectionHeader text="Floorplan" />
                  {Floorplan ? (
                    <img
                      className="max-w-2xl self-center rounded-big object-cover"
                      src={Floorplan?.Filepath}
                      alt=""
                    />
                  ) : (
                    <Copy text="The floorplan will be coming soon!" size="lg" />
                  )}
                </>
              )}
              {currentMenuItem === "EPC" && (
                <>
                  <SectionHeader text="Energy performance certificate" />
                  <img
                    className="max-w-2xl self-center rounded-big object-cover"
                    src={EPC?.Filepath}
                    alt=""
                  />
                </>
              )}
            </div>
            <div>
              <SectionHeader addClasses="pb-9 md:pb-12" text="Location" />
              <PropertyMap location={location} />
              <div className="flex flex-col gap-5 py-7 md:flex-row">
                <Link text="Get Directions" type="primary" link="/" />
                <Link text="Download Brochure" type="primary" link="/" />
              </div>
              <div className="flex w-full flex-col gap-5 rounded-big bg-secondary-100 px-3 py-8 text-primary-100 md:px-8 lg:p-12">
                <SectionHeader text="Interested in this property?" />
                <Copy
                  text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore."
                  size="lg"
                />
                <div className="flex flex-col gap-4 md:flex-row">
                  <Link text="Book a viewing" link="/" type="white" size="lg" />
                  <Link
                    text="Make an offer"
                    link="/"
                    type="primary"
                    size="lg"
                  />
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
