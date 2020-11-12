import { createContext } from "react";
import { MarketFields } from "../types/market";

export type MarketsContextType = {
  markets: MarketFields[];
};

export const marketsDefaultValue: MarketsContextType = {
  markets: []
};

export const MarketsContext = createContext<MarketsContextType>(
  marketsDefaultValue
);
