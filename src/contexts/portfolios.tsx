import { createContext } from "react";
import { IAddProps } from "types/common";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";

export type PortfoliosContextType = {
  portfolios: IPortfolio[];
  portfolio: IPortfolio | null;
  isLoading: boolean;
  create: (portfolio: PortfolioFormFields) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getAll: () => void;
  getById: (portfolioId: string) => IPortfolio|null;
  update: (currencyId: string, currency: PortfolioFormFields) => IAddProps;
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: [],
  portfolio: null,
  isLoading: false,
  create: () => ({ changes: false }),
  deleteById: () => ({ changes: false }),
  getAll: () => null,
  getById: () => null,
  update: () => ({ changes: false })
};

export const PortfoliosContext = createContext<PortfoliosContextType>(
  portfoliosDefaultValue
);
