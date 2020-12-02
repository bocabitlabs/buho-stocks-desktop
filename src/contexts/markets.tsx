import { createContext } from "react";
import { MarketFields, MarketItemProps } from "../types/market";

export type MarketsContextType = {
  markets: MarketFields[];
  isLoading: boolean;
  fetchMarkets: () => void;
  addMarket: (sector: MarketItemProps) => void;
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
