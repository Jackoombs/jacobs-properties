import { useState } from "react";
import PropertyDetailMenu from "./PropertyDetailMenu";
import PropertyGallery from "./PropertyGallery";

import type { Image2 } from "../../env";
import type { GoogleMapProps } from "@react-google-maps/api";

import PropertyDescription from "./PropertyDescription";

interface Props {
  details: {
    description: string;
    floorplan: Image2[];
    epc: Image2[];
    images: Image2[];
    virtualTour?: string;
  };
  location: GoogleMapProps["center"];
  address: string;
  price: string;
  id: string;
  brochure?: string;
}

export type DetailItem =
  | "Description"
  | "Floorplan"
  | "EPC"
  | "Gallery"
  | "Virtual Tour";

export default function PropertyDetails({
  details,
  location,
  address,
  price,
  id,
  brochure,
}: Props) {
  const detailMenuItems = [
    details.description && "Description",
    details.floorplan.length !== 0 && "Floorplan",
    details.epc.length !== 0 && "EPC",
    details.images.length !== 0 && "Gallery",
    details.virtualTour && "Virtual Tour",
  ].filter(Boolean) as DetailItem[];

  console.log(detailMenuItems);

  const [currentMenuItem, setCurrentMenuItem] = useState<DetailItem>(
    detailMenuItems[0]
  );

  return (
    <>
      <section className="bg-primary-200 pt-4 md:bg-white md:py-0">
        <div className="mx-auto max-w-container-lg">
          <PropertyDetailMenu
            {...{ currentMenuItem, setCurrentMenuItem, detailMenuItems }}
          />
        </div>
      </section>

      <section className="bg-primary-200 py-4">
        <div className="mx-auto max-w-container-lg">
          {currentMenuItem === "Description" && (
            <PropertyDescription
              {...{ address, price, location, brochure }}
              description={details.description}
            />
          )}
          {currentMenuItem === "Floorplan" && (
            <div className="py-10">
              {details.floorplan &&
                details.floorplan.map((image, index) => (
                  <img
                    key={index}
                    className="w-full self-center rounded-big object-cover"
                    src={image.url}
                    alt={image.caption}
                  />
                ))}
            </div>
          )}
          {currentMenuItem === "EPC" && (
            <div className="py-10">
              {details.epc &&
                details.epc.map((image, index) => (
                  <img
                    key={index}
                    className="mx-auto w-full self-center rounded-big object-cover lg:max-w-[50%]"
                    src={image.url}
                    alt={image.caption}
                  />
                ))}
            </div>
          )}
          {currentMenuItem === "Gallery" && (
            <PropertyGallery id={id} images={details.images} />
          )}
        </div>
      </section>
    </>
  );
}
