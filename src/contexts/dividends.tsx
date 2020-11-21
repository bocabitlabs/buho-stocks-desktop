import { createContext } from "react";
import { DividendFields } from "../types/dividend";

export type DividendsContextType = {
  dividends: DividendFields[];
};

export const sharesDefaultValue: DividendsContextType = {
  dividends: []
};

export const DividendsContext = createContext<DividendsContextType>(
  sharesDefaultValue
);