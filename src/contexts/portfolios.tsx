import { createContext } from "react";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";

export type PortfoliosContextType = {
  portfolios: IPortfolio[];
  portfolio: IPortfolio|null,
  isLoading: boolean;
  fetchPortfolios: () => void;
  fetchPortfolio: (portfolioId: string) => void,
  addPortfolio: (portfolio: PortfolioFormFields) => void;
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: [],
  portfolio: null,
  isLoading: false,
  fetchPortfolios: () => null,
  fetchPortfolio: () => null,
  addPortfolio: () => null
};

export const PortfoliosContext = createContext<PortfoliosContextType>(
  portfoliosDefaultValue
);
