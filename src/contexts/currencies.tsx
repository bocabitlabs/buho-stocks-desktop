import { createContext } from "react";
import { IAddProps } from "types/common";
import { ICurrency, CurrencyFormFields } from "types/currency";

export type CurrenciesContextType = {
  currency: ICurrency | null;
  currencies: ICurrency[];
  isLoading: boolean;
  fetchCurrencies: () => void;
  getById: (currencyId: string) => ICurrency | null;
  create: (currency: CurrencyFormFields) => IAddProps;
  update: (currencyId: string, currency: CurrencyFormFields) => IAddProps;
};

export const currenciesDefaultValue: CurrenciesContextType = {
  currency: null,
  currencies: [],
  isLoading: false,
  fetchCurrencies: () => null,
  getById: (): ICurrency | null => null,
  create: () => ({ changes: false }),
  update: () => ({ changes: false })
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
  currenciesDefaultValue
);
