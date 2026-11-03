export interface SearchCriteria {
  buyOrRent: "buy" | "rent";
  location: string | undefined;
  minBeds: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  propertyType: string | undefined;
  excludeSold: boolean;
}

export const DEFAULT_SEARCH_CRITERIA: SearchCriteria = {
  buyOrRent: "buy",
  location: undefined,
  minBeds: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  propertyType: undefined,
  excludeSold: false,
};
