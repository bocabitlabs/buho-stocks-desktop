import { createContext } from "react";
import { Market, MarketFormProps } from "types/market";

export type MarketsContextType = {
  markets: Market[];
  isLoading: boolean;
  fetchMarkets: () => void;
  addMarket: (sector: MarketFormProps) => void;
};

export const marketsDefaultValue: MarketsContextType = {
  markets: [],
  isLoading: false,
  fetchMarkets: () => null,
  addMarket: () => null
};

export const MarketsContext = createContext<MarketsContextType>(
  marketsDefaultValue
);
