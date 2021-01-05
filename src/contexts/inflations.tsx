import { createContext } from "react";
import { Inflation, InflationFormFields } from "types/inflation";

export type InflationsContextType = {
  inflations: Inflation[];
  isLoading: boolean;
  fetchInflations: () => void;
  addInflation: (inflation: InflationFormFields) => void;
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