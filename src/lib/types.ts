export type MarketingMode = "selling" | "letting";

/**
 * Where a listing is in its life, as normalised by the API: the same four
 * values whichever system the property came from.
 */
export type PropertyStatus = "active" | "agreed" | "completed" | "withdrawn";

export interface PropertyImageUrls {
  full?: string;
  hero?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
}

export interface PropertyImage {
  id?: string;
  /** The original asset. Prefer a `urls` variant for display. */
  url: string;
  urls?: PropertyImageUrls;
  caption?: string;
  name?: string;
  type?: string;
  order?: number;
  isFeatured?: boolean;
  featureIndex?: number;
}

export interface PropertyEpc {
  rating?: string;
  energyEfficiencyCurrent?: string;
  energyEfficiencyPotential?: string;
  environmentImpactCurrent?: string;
  environmentImpactPotential?: string;
  reportUrl?: string;
}

export interface PropertyLocation {
  latitude?: number;
  longitude?: number;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  marketingMode: MarketingMode;
  propertyType: string[];
  /** Unset when the API did not recognise the source's own status. */
  status?: PropertyStatus;
  /** Display-ready badge text ("For Sale", "SSTC", "Let Agreed", …). */
  statusLabel?: string;
  description?: string;
  shortDescription?: string;
  address1?: string;
  address2?: string;
  /** Anonymised address safe for public listing pages. */
  publicAddress?: string;
  postcode?: string;
  price: number;
  priceQualifier?: string;
  displayPrice?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  receptions?: number;
  primaryImage?: PropertyImage;
  images: PropertyImage[];
  floorplan: PropertyImage[];
  epc?: PropertyEpc;
  created?: string;
  updated?: string;
  virtualTour?: string;
  brochure?: string;
  isCommercial?: boolean;
  location: PropertyLocation;
}

export type SubmitState = "default" | "loading" | "error";

/**
 * CTA buttons across the marketing pages are either a plain link or one of
 * the multi-step form modals — this lets Strapi-driven sections describe
 * "which action" without the CMS knowing about React components.
 */
export type Cta =
  | { type: "link"; text: string; link: string; newTab?: boolean }
  | { type: "get-in-touch"; text: string }
  | { type: "expert-valuation"; text: string }
  | { type: "instant-valuation"; text: string }
  | { type: "brochure"; text: string; buyOrRent: "buy" | "rent"; pdfUrl: string };
