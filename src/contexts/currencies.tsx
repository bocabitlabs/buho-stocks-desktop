import { createContext } from "react";
import { IAddProps } from "types/common";
import { Currency, CurrencyFormFields } from "types/currency";

export type CurrenciesContextType = {
  currency: Currency | null;
  currencies: Currency[];
  isLoading: boolean;
  fetchCurrencies: () => void;
  getById: (currencyId: string) => Currency | null;
  addCurrency: (currency: CurrencyFormFields) => IAddProps;
  update: (currencyId: string, currency: CurrencyFormFields) => IAddProps;
};

export const currenciesDefaultValue: CurrenciesContextType = {
  currency: null,
  currencies: [],
  isLoading: false,
  fetchCurrencies: () => null,
  getById: (): Currency | null => null,
  addCurrency: () => ({ changes: false }),
  update: () => ({ changes: false })
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
  currenciesDefaultValue
);
