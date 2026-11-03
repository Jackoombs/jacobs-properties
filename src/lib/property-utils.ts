import { format } from "date-fns";
import type {
  LatLngLiteral,
  PropertyImage,
  PropertyImageUrls,
  PropertyLocation,
  PropertyStatus,
} from "@/lib/types";

export const priceNumberToPriceString = (number: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(number);
};

export const priceStringToPriceNumber = (price: string): number => {
  return +price.split(" ")[0].replace(/[^0-9.]/g, "");
};

export const generatePriceOptions = (
  minPrice: number,
  maxPrice: number,
  interval: number,
) => {
  const values: number[] = [];
  let currentValue = 0;
  while (minPrice + currentValue <= maxPrice) {
    values.push(minPrice + currentValue);
    currentValue += interval;
  }
  return values.map((value) => priceNumberToPriceString(value));
};

export const removeArrayDuplicates = (array: string[]) => {
  return Array.from(new Set(array));
};

export const getNumberFromPriceString = (
  formattedNumber: string,
): number | undefined => {
  const unformattedNumber = formattedNumber
    .replace(/\([^)]*\)/, "")
    .replace(/[^\d.]/g, "");
  if (Number.isNaN(unformattedNumber)) {
    return undefined;
  }
  return +unformattedNumber;
};

/**
 * Still on the market with no offer or tenant. A missing status counts, as it
 * does on the API, which treats a listing it could not classify as available.
 */
export const isActiveStatus = (status: PropertyStatus | undefined): boolean =>
  !status || status === "active";

/** A deal is agreed or done: SSTC or sold when selling, let agreed or let when letting. */
export const isSoldOrLetStatus = (status: PropertyStatus | undefined): boolean =>
  status === "agreed" || status === "completed";

/** Picks a size variant, falling back to the original asset. */
export const getImageSrc = (
  image: PropertyImage,
  size: keyof PropertyImageUrls = "large",
): string => image.urls?.[size] ?? image.url;

export const toLatLng = (location: PropertyLocation | undefined): LatLngLiteral | undefined => {
  if (location?.latitude === undefined || location?.longitude === undefined) return undefined;
  return { lat: location.latitude, lng: location.longitude };
};

export const truncateDescription = (description: string, length: number) => {
  const words = description.split(" ");
  if (words.length > length) {
    return words.slice(0, length).join(" ") + "...";
  }
  return description;
};

interface DateFieldValue {
  date: Date | string;
  [otherFields: string]: unknown;
}

interface FormDataWithDates {
  dates: DateFieldValue[];
  [otherFields: string]: unknown;
}

const formatDate = (date: Date) => format(date, "iiii do MMMM yyyy");

export const formatDates = (data: FormDataWithDates): FormDataWithDates => {
  const formattedDates = data.dates.map((date) => {
    if (!(date.date instanceof Date)) return date;
    return { ...date, date: formatDate(date.date) };
  });
  return { ...data, dates: formattedDates };
};
