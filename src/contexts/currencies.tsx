import { createContext } from "react";
import { CurrencyFields } from "../types/currency";

export type CurrenciesContextType = {
  currencies: CurrencyFields[];
};

export const currenciesDefaultValue: CurrenciesContextType = {
  currencies: []
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
  currenciesDefaultValue
);
