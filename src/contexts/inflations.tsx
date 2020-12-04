import { createContext } from "react";
import { InflationFields, InflationItemProps } from "../types/inflation";

export type InflationsContextType = {
  inflations: InflationFields[];
  isLoading: boolean;
  fetchInflations: () => void;
  addInflation: (inflation: InflationItemProps) => void;
  fetchInflationsForYear: (year: number) => void;
};

export const inflationDefaultValue: InflationsContextType = {
  inflations: [],
  isLoading: false,
  fetchInflations: () => null,
  addInflation: () => null,
  fetchInflationsForYear: () => null
};

export const InflationsContext = createContext<InflationsContextType>(
  inflationDefaultValue
);