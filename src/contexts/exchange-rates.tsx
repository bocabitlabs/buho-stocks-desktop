import { createContext } from "react";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";

export type ExchangeRatesContextType = {
  exchangeRates: IExchangeRate[];
  exchangeRate: IExchangeRate|null;
  isLoading: boolean;
  fetchAll: () => void;
  get: (transactionDate: string, exchangeName: string) => void,
  add: (exchangeRate: IExchangeRateForm) => void;
};

export const defaultValue: ExchangeRatesContextType = {
  exchangeRates: [],
  exchangeRate: null,
  isLoading: false,
  fetchAll: () => null,
  get: () => null,
  add: () => null
};

export const ExchangeRatesContext = createContext<ExchangeRatesContextType>(
  defaultValue
);