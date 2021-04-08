import { createContext } from "react";
import { IAddProps } from "types/common";
import { IMarket, MarketFormProps } from "types/market";

export type MarketsContextType = {
  market: IMarket|null;
  markets: IMarket[];
  isLoading: boolean;
  fetchMarkets: () => void;
  create: (sector: MarketFormProps) => IAddProps;
  getById: (currencyId: string) => IMarket | null;
  update: (currencyId: string, currency: MarketFormProps) => IAddProps;
};

export const marketsDefaultValue: MarketsContextType = {
  market: null,
  markets: [],
  isLoading: false,
  fetchMarkets: () => null,
  create: () => ({ changes: false }),
  getById: (): IMarket | null => null,
  update: () => ({ changes: false })
};

export const MarketsContext = createContext<MarketsContextType>(
  marketsDefaultValue
);
