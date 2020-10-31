import { createContext } from "react";
import { CurrencyFields, CurrencyItemProps } from "../types/currency";

export type CurrenciesContextType = {
  currencies: CurrencyFields[];
  isLoading: boolean;
  fetchCurrencies: () => void;
  addCurrency: (currency: CurrencyItemProps) => void;
};

export const currenciesDefaultValue: CurrenciesContextType = {
  currencies: [],
  isLoading: false,
  fetchCurrencies: () => null,
  addCurrency: () => null
}

export const CurrenciesContext = createContext<CurrenciesContextType>(currenciesDefaultValue);