import { createContext } from "react";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";

export type ExchangeRatesContextType = {
  exchangeRates: IExchangeRate[];
  exchangeRate: IExchangeRate|null;
  isLoading: boolean;
  getAll: () => void;
  get: (transactionDate: string, exchangeName: string) => IExchangeRate|null,
};

export const defaultValue: ExchangeRatesContextType = {
  exchangeRates: [],
  exchangeRate: null,
  isLoading: false,
  getAll: () => null,
  get: () => null,
};

export const ExchangeRatesContext = createContext<ExchangeRatesContextType>(
  defaultValue
);