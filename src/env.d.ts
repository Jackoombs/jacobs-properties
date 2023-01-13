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
  EPC?: Image;
  Floorplan?: Image | Image[];
  TimeAmended: string;
}

interface Image {
  Filepath: string;
  Caption: string;
  TimeAmended: string;
  Width?: number;
  Height?: number;
}
