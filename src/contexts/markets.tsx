import { createContext } from "react";
import { IAddProps } from "types/common";
import { Market, MarketFormProps } from "types/market";

export type MarketsContextType = {
  market: Market|null;
  markets: Market[];
  isLoading: boolean;
  fetchMarkets: () => void;
  addMarket: (sector: MarketFormProps) => IAddProps;
  getById: (currencyId: string) => Market | null;
  update: (currencyId: string, currency: MarketFormProps) => IAddProps;
};

export const marketsDefaultValue: MarketsContextType = {
  market: null,
  markets: [],
  isLoading: false,
  fetchMarkets: () => null,
  addMarket: () => ({ changes: false }),
  getById: (): Market | null => null,
  update: () => ({ changes: false })
};

export const MarketsContext = createContext<MarketsContextType>(
  marketsDefaultValue
);
