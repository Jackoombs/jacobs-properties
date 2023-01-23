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
