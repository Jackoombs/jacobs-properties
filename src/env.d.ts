/// <reference types="@astrojs/image/client" />

export interface Property {
  ID: string;
  Description: string;
  Image: Array<Image>;
  Address1: string;
  Address2: string;
  Status: string;
  PriceString: string;
  TotalBedrooms: number;
  Bathrooms: number;
  InternalLettingStatus?: string;
  InternalSaleStatus?: string;
  TimeAmended: Date;
}

interface Image {
  Filepath: string;
}
