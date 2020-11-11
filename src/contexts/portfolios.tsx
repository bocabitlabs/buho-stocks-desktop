import { createContext } from "react";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export type PortfoliosContextType = {
  portfolios: PortfolioFields[];
  portfolio: PortfolioFields | null,
  fetchPortfolios: () => void;
  fetchPortfolio: (portfolioId: string) => void,
  // addPortfolio: (portfolio: PortfolioItemProps) => null|string;
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: [],
  portfolio: null,
  fetchPortfolios: () => null,
  fetchPortfolio: () => null,
  // addPortfolio: () => null
}

export const PortfoliosContext = createContext<PortfoliosContextType>(portfoliosDefaultValue);
