import { createContext } from "react";
import { IAddProps } from "types/common";
import { IMarket, MarketFormProps } from "types/market";

export type MarketsContextType = {
  market: IMarket|null;
  markets: IMarket[];
  isLoading: boolean;
  getAll: () => IMarket[];
  create: (sector: MarketFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getById: (currencyId: string) => IMarket | null;
  update: (currencyId: string, currency: MarketFormProps) => IAddProps;
};

export const marketsDefaultValue: MarketsContextType = {
  market: null,
  markets: [],
  isLoading: false,
  getAll: () => [],
  create: () => ({ changes: false }),
  deleteById: () => ({ changes: false }),
  getById: (): IMarket | null => null,
  update: () => ({ changes: false })
};

export const MarketsContext = createContext<MarketsContextType>(
  marketsDefaultValue
);
