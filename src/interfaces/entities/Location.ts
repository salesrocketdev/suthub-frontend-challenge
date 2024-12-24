import type { Geo } from "./Geo";

export interface Location {
  address: string;
  city: string;
  coordinates: Geo;
  postalCode: string;
  state: string;
}
