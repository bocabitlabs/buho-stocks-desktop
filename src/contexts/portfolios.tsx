import { createContext } from "react";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export type PortfoliosContextType = {
  portfolios: PortfolioFields[];
  portfolio: PortfolioFields[],
  isLoading: boolean;
  fetchPortfolios: () => void;
  fetchPortfolio: (portfolioId: string) => void,
  addPortfolio: (portfolio: PortfolioItemProps) => void;
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: [],
  portfolio: [],
  isLoading: false,
  fetchPortfolios: () => null,
  fetchPortfolio: () => null,
  addPortfolio: () => null
}

export const PortfoliosContext = createContext<PortfoliosContextType>(portfoliosDefaultValue);