import { createContext } from "react";
import { InflationFields, InflationItemProps } from "../types/inflation";

export type InflationsContextType = {
  inflations: InflationFields[];
  inflation: InflationFields|null;
  isLoading: boolean;
  fetchInflations: () => void;
  addInflation: (inflation: InflationItemProps) => void;
  fetchInflationForYear: (year: number) => void;
};

export const inflationDefaultValue: InflationsContextType = {
  inflations: [],
  inflation: null,
  isLoading: false,
  fetchInflations: () => null,
  addInflation: () => null,
  fetchInflationForYear: () => null
};

export const InflationsContext = createContext<InflationsContextType>(
  inflationDefaultValue
);