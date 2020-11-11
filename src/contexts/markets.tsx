import { createContext } from "react";
import { MarketFields } from "../types/market";

export type MarketsContextType = {
  markets: MarketFields[];
  fetchMarkets: () => void;
};

export const marketsDefaultValue: MarketsContextType = {
  markets: [],
  fetchMarkets: () => null,
}

export const MarketsContext = createContext<MarketsContextType>(marketsDefaultValue);