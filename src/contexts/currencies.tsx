import { createContext } from "react";
import { Currency, CurrencyFormFields } from "types/currency";

export type CurrenciesContextType = {
  currencies: Currency[];
  isLoading: boolean;
  fetchCurrencies: () => void;
  addCurrency: (currency: CurrencyFormFields) => void;
};

export const currenciesDefaultValue: CurrenciesContextType = {
  currencies: [],
  isLoading: false,
  fetchCurrencies: () => null,
  addCurrency: () => null
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
  currenciesDefaultValue
);
