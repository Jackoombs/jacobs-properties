import type { LatLngLiteral } from "@/lib/types";

// Basingstoke town centre — used as the default map center on the property
// search page. Previously re-geocoded on every build; hardcoded since it
// never changes.
export const BASINGSTOKE_CENTER: LatLngLiteral = {
  lat: 51.2667,
  lng: -1.0876,
};
