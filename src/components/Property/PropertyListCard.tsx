import type { Image } from "../../env";
import ImageSlider from "../General/ImageCarousel/ImageSlider";
import SectionHeader from "../General/Text/SectionHeader";
import Copy from "../General/Text/Copy";
import Link from "../General/Link";

interface Props {
  ID: string;
  Address1: string;
  Address2: string;
  PriceString: string;
  TotalBedrooms: number;
  Bathrooms: number;
  status: string | undefined;
  Image: Image[];
}

export default function PropertyListCard({
  ID,
  Address1,
  Address2,
  PriceString,
  status,
  Image,
  TotalBedrooms,
  Bathrooms,
}: Props) {
  const statusString = () => {
    if (
      status === "Under offer - Available" ||
      status === "Sold STC - Available" ||
      status === "Sold STC - Unavailable"
    ) {
      return "SSTC";
    } else if (status === "Exchanged" || status === "Completed") {
      return "Sold";
    } else if (status === "For Sale - Available") {
      return "For Sale";
    }

    if (
      status === "To Let - Available" ||
      status === "Tenancy Current - Available"
    ) {
      return "To Let";
    } else if (
      status === "Tenancy Current - Unavailable" ||
      status === "Under Offer - Available" ||
      status === "Arranging Tenancy - Available" ||
      status === "Tenancy Finished"
    ) {
      return "Let";
    }

    return "N/A";
  };
  return (
    <div className="flex w-full flex-row items-center justify-between gap-16">
      <ImageSlider
        images={Image.map((image) => image.Filepath)}
        description="hi"
        ID={ID}
      />
      <div className="order-2 flex flex-col gap-2 xl:gap-5">
        <p className="mb-2 flex h-10 w-max items-center justify-center rounded-md bg-secondary-100 px-7 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 lg:h-14">
          For sale
        </p>
        <ul className="flex gap-7 text-primary-100">
          <li className="text-[0.875rem] font-semibold uppercase tracking-[1.4px]">
            {`${TotalBedrooms} Bed`}
          </li>
          <div className="h-3 self-center border-l-2 border-secondary-100"></div>
          <li className="text-[0.875rem] font-semibold uppercase tracking-[1.4px]">
            {`${Bathrooms} Bath`}
          </li>
        </ul>
        <div className="pb-4 lg:pb-0">
          <SectionHeader
            addClasses={"lg:pb-2"}
            text={`${Address1}, ${Address2}`}
          />
          <span className="flex items-center gap-4">
            <SectionHeader text={PriceString} />
            <p className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100">
              Guide Price
            </p>
          </span>
        </div>
        <Copy
          addClasses="hidden lg:block"
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore."
          size="lg"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            text="View Property"
            size="lg"
            link={`properties/${ID}`}
            type="primary"
          />
        </div>
      </div>
    </div>
  );
}
