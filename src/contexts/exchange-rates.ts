import { createContext } from "react";
import { IAddProps } from "types/common";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";

export type ExchangeRatesContextType = {
  exchangeRates: IExchangeRate[];
  exchangeRate: IExchangeRate|null;
  isLoading: boolean;
  getAll: () => void;
  get: (transactionDate: string, exchangeName: string) => IExchangeRate|null,
  create: (exchangeRate: IExchangeRateForm) => IAddProps;
};

export const defaultValue: ExchangeRatesContextType = {
  exchangeRates: [],
  exchangeRate: null,
  isLoading: false,
  getAll: () => null,
  get: () => null,
  create: () =>  ({changes: false})
};

export const ExchangeRatesContext = createContext<ExchangeRatesContextType>(
  defaultValue
);