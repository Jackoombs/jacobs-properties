import CardCarousel from "@/components/marketing/CardCarousel";
import { SectionSubHeader } from "@/components/common/Text";

interface AudienceLink {
  title: string;
  link: string;
  image?: string;
}

interface Props {
  heading: string;
  links: AudienceLink[];
}

/**
 * The original's "How can we Help?" slider. 1.1 cards up on mobile, then 2, 3
 * and 4 across at 640, 768 and 2000px; the gutter goes 20, 40 and 64px at
 * 1280 and 1700px. Like the process steps, the next card bleeds past the
 * container edge (the section clips the page).
 */
export default function AudienceCarousel({ heading, links }: Props) {
  return (
    <CardCarousel
      heading={heading}
      viewportClassName="overflow-visible"
      contentClassName="min-[1700px]:-ml-16"
      itemClassName="basis-[90.9%] min-[640px]:basis-1/2 min-[768px]:basis-1/3 min-[1700px]:pl-16 min-[2000px]:basis-1/4"
    >
      {links.map(({ title, link, image }) => (
        <div key={link} className="relative aspect-[1.17/1] overflow-hidden rounded-big">
          <a href={link} className="relative block h-full w-full duration-100 hover:scale-105">
            {image && (
              <img
                src={image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-bottom"
              />
            )}
            {/* The flat 25% darkening the original laid over each photo. */}
            <span className="absolute inset-0 bg-black/25" />
            <SectionSubHeader size="lg" textColor="text-white" className="absolute bottom-10 left-8">
              {title}
            </SectionSubHeader>
          </a>
        </div>
      ))}
    </CardCarousel>
  );
}
