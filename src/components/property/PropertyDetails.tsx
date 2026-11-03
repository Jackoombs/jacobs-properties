import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getImageSrc } from "@/lib/property-utils";
import type { LatLngLiteral, MarketingMode, PropertyEpc, PropertyImage } from "@/lib/types";
import Link from "@/components/common/Link";
import Copy from "@/components/common/Copy";
import ProgressiveImage from "@/components/common/ProgressiveImage";
import PropertyDescription from "./PropertyDescription";
import PropertyGallery from "./PropertyGallery";

interface Props {
  details: {
    description: string;
    floorplan: PropertyImage[];
    epc?: PropertyEpc;
    images: PropertyImage[];
    virtualTour?: string;
  };
  location: LatLngLiteral | undefined;
  address: string;
  price: number;
  id: string;
  brochure?: string;
  marketingMode: MarketingMode;
}

type DetailItem = "description" | "floorplan" | "epc" | "gallery" | "virtual-tour";

const LABELS: Record<DetailItem, string> = {
  description: "Description",
  floorplan: "Floorplan",
  epc: "EPC",
  gallery: "Gallery",
  "virtual-tour": "Virtual Tour",
};

const EPC_RATINGS = [
  { band: "A", color: "#00A651" },
  { band: "B", color: "#4CB748" },
  { band: "C", color: "#AACD3E" },
  { band: "D", color: "#FFF200" },
  { band: "E", color: "#FCB040" },
  { band: "F", color: "#F7941E" },
  { band: "G", color: "#ED1C24" },
];

const isImageUrl = (url: string) => /\.(png|jpe?g|webp|gif|avif)$/i.test(url);

function EpcSummary({ epc }: { epc: PropertyEpc }) {
  return (
    <div className="flex flex-col gap-6 py-10">
      {epc.reportUrl && isImageUrl(epc.reportUrl) && (
        <ProgressiveImage
          src={epc.reportUrl}
          alt="EPC certificate"
          fill={false}
          className="w-full self-center rounded-big object-cover lg:max-w-[50%]"
        />
      )}
      {epc.rating && (
        <div className="flex items-center gap-4">
          <div
            className="flex size-16 items-center justify-center rounded-big text-2xl font-bold text-white"
            style={{
              backgroundColor:
                EPC_RATINGS.find((r) => r.band === epc.rating?.toUpperCase())?.color ?? "#90a2b5",
            }}
          >
            {epc.rating}
          </div>
          <Copy size="lg">Energy performance rating</Copy>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {epc.energyEfficiencyCurrent && (
          <div className="rounded-big bg-white p-6">
            <Copy size="sm" textColor="text-placeholder">
              Energy efficiency (current)
            </Copy>
            <p className="text-2xl font-semibold text-primary-100">{epc.energyEfficiencyCurrent}</p>
          </div>
        )}
        {epc.energyEfficiencyPotential && (
          <div className="rounded-big bg-white p-6">
            <Copy size="sm" textColor="text-placeholder">
              Energy efficiency (potential)
            </Copy>
            <p className="text-2xl font-semibold text-primary-100">{epc.energyEfficiencyPotential}</p>
          </div>
        )}
        {epc.environmentImpactCurrent && (
          <div className="rounded-big bg-white p-6">
            <Copy size="sm" textColor="text-placeholder">
              Environmental impact (current)
            </Copy>
            <p className="text-2xl font-semibold text-primary-100">{epc.environmentImpactCurrent}</p>
          </div>
        )}
        {epc.environmentImpactPotential && (
          <div className="rounded-big bg-white p-6">
            <Copy size="sm" textColor="text-placeholder">
              Environmental impact (potential)
            </Copy>
            <p className="text-2xl font-semibold text-primary-100">{epc.environmentImpactPotential}</p>
          </div>
        )}
      </div>
      {epc.reportUrl && !isImageUrl(epc.reportUrl) && (
        <Link type="primary" link={epc.reportUrl} newTab className="md:max-w-xs">
          View full EPC report
        </Link>
      )}
    </div>
  );
}

export default function PropertyDetails({
  details,
  location,
  address,
  price,
  id,
  brochure,
  marketingMode,
}: Props) {
  const items: DetailItem[] = [
    details.description && "description",
    details.floorplan.length !== 0 && "floorplan",
    details.epc && "epc",
    details.images.length !== 0 && "gallery",
    details.virtualTour && "virtual-tour",
  ].filter(Boolean) as DetailItem[];

  return (
    <Tabs defaultValue={items[0]} className="gap-0">
      <section className="bg-primary-200 pt-4 md:bg-white md:py-0">
        <div className="mx-auto max-w-container-lg">
          <TabsList className="grid h-auto w-full group-data-horizontal/tabs:h-auto grid-cols-2 gap-3 rounded-none bg-transparent p-0 md:flex md:w-fit md:justify-start">
            {items.map((item, index) => (
              <TabsTrigger
                key={item}
                value={item}
                className={cn(
                  // Lime on mobile; from md up the active tab is pale blue so it joins the panel below it.
                  "h-14 flex-none rounded-(--radius-big) border-0 bg-white p-0 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:text-primary-100 data-active:bg-secondary-100 data-active:text-primary-100 group-data-[variant=default]/tabs-list:data-active:shadow-none md:min-w-32 md:rounded-b-none md:text-black md:hover:text-black md:data-active:bg-primary-200 md:data-active:text-black lg:min-w-56",
                  index === items.length - 1 && items.length % 2 !== 0 && "col-span-2",
                )}
              >
                {LABELS[item]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </section>

      <section className="bg-primary-200 py-4">
        <div className="mx-auto max-w-container-lg">
          <TabsContent value="description" className="text-base">
            <PropertyDescription
              address={address}
              price={price}
              location={location}
              brochure={brochure}
              marketingMode={marketingMode}
              propertyId={id}
              description={details.description}
            />
          </TabsContent>
          <TabsContent value="floorplan" className="text-base">
            <div className="py-10">
              {details.floorplan.map((image, index) => (
                <ProgressiveImage
                  key={image.id ?? index}
                  fill={false}
                  className="w-full self-center rounded-big object-cover"
                  src={getImageSrc(image, "large")}
                  alt={image.caption || ""}
                />
              ))}
            </div>
          </TabsContent>
          {details.epc && (
            <TabsContent value="epc" className="text-base">
              <EpcSummary epc={details.epc} />
            </TabsContent>
          )}
          <TabsContent value="gallery" className="text-base">
            <PropertyGallery images={details.images} />
          </TabsContent>
        </div>
      </section>
    </Tabs>
  );
}
