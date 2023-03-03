import type { Property2 } from "./env";
import { format, parseISO } from "date-fns";

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
  interval: number
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
  formattedNumber: string
): number | undefined => {
  const unformattedNumber = formattedNumber
    .replace(/\([^\)]*\)/, "")
    .replace(/[^\d.]/g, "");
  if (Number.isNaN(unformattedNumber)) {
    return undefined;
  } else {
    return +unformattedNumber;
  }
};

export const toArray = <T,>(item: T | T[] | undefined): T[] | undefined => {
  if (!item) {
    return undefined;
  } else if (!Array.isArray(item)) {
    return [item];
  } else {
    return item;
  }
};

export const getPropertyStatus = (
  status: Property2["status"],
  type: Property2["type"]
) => {
  if (
    status === "sold" ||
    status === "exchanged" ||
    status === "completed" ||
    status === "soldExternally"
  ) {
    return "sold";
  } else if (status === "forSale") {
    return "for sale";
  } else if (status === "underOffer" && type === "selling") {
    return "sstc";
  } else if (status === "reserved") {
    return "reserved";
  } else if (status === "toLet") {
    return "to let";
  } else if (
    (status === "underOffer" && type === "letting") ||
    status === "arrangingTenancy"
  ) {
    return "let agreed";
  } else if (status === "tenancyCurrent" || status === "tenancyFinished") {
    return "let";
  } else {
    return "n/a";
  }
};

export const getImageFileNameFromUrl = (url: string, withExt: boolean) => {
  const regex: RegExp = /([^/]+$)/;

  const match: RegExpMatchArray | null = url.match(regex);

  if (match) {
    const fileName: string = match[1];
    const fileNameWithoutExtension: string = fileName.split(".")[0];
    return withExt ? fileName : fileNameWithoutExtension;
  }
};

export interface Data {
  dates: {
    date: Date | "";
    [otherFields: string]: any;
  }[];
  [otherFields: string]: any;
}

const formatDate = (date: Date) => {
  return format(date, "iiii do MMMM yyyy");
};

export const formatDates = (data: Data) => {
  const formatedData = data.dates.map((date) => {
    if (!date.date) {
      return date;
    } else {
      const formattedDate = formatDate(date.date);
      return { ...date, date: formattedDate };
    }
  });
  return { ...data, dates: formatedData };
};
