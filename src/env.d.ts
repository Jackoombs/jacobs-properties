/// <reference types="@astrojs/image/client" />

export interface Property {
  ID: string;
  Description?: string;
  Image: Image[];
  Address1: string;
  Address2: string;
  PriceString: string;
  TotalBedrooms: number;
  Bathrooms: number;
  ReceptionRooms: number;
  InternalLettingStatus?: string;
  InternalSaleStatus?: string;
  EPC?: Image | Image[];
  Floorplan?: Image | Image[];
  TimeAmended: string;
  Location?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  VirtualTour?: string;
}

export interface Property2 {
  id: string;
  type: "selling" | "letting" | "sellingAndLetting";
  status:
    | "preAppraisal"
    | "valuation"
    | "paidValuation"
    | "forSale"
    | "forSaleUnavailable"
    | "underOffer"
    | "underOfferUnavailable"
    | "reserved"
    | "exchanged"
    | "completed"
    | "soldExternally"
    | "withdrawn"
    | "valuation"
    | "toLet"
    | "toLetUnavailable"
    | "underOffer"
    | "underOfferUnavailable"
    | "arrangingTenancyUnavailable"
    | "arrangingTenancy"
    | "tenancyCurrentUnavailable"
    | "tenancyCurrent"
    | "tenancyFinished"
    | "tenancyCancelled"
    | "sold"
    | "letByOtherAgent"
    | "letPrivately"
    | "provisional"
    | "withdrawn";
  description: string;
  address1: string;
  address2: string;
  postcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  images: Image2[];
  floorplan: Image2[];
  epc: Image2[];
  created: string;
  virtualTour?: string;
  brochure?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
}

interface Image2 {
  readonly _links?: {
    [name: string]: {
      href?: string;
    };
  };
  readonly _embedded?: {
    [name: string]: any;
  };
  id: string;
  created: string; // date-time
  modified: string; // date-time
  propertyId: string;
  url: string;
  caption?: string;
  type: "photograph" | "floorplan" | "epc";
  order?: number; // int32
  readonly _eTag?: string;
}

interface Room {
  name: string;
  dimensions?: string;
  dimensionsAlt?: string;
  description?: string;
}

interface Image {
  Filepath: string;
  Caption: string;
  TimeAmended: string;
  Width?: number;
  Height?: number;
}

export interface FAQType {
  question: string;
  answer: string;
}

export type Client = "buyers" | "sellers" | "landlords" | "tenants";
