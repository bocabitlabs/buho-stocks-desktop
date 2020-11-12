import { createContext } from "react";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export type PortfoliosContextType = {
  portfolios: PortfolioFields[];
  // portfolio: PortfolioFields | null,
  // fetchPortfolio: (portfolioId: string) => void,
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: [],
  // portfolio: null,
  // fetchPortfolio: () => null,
}

export const PortfoliosContext = createContext<PortfoliosContextType>(portfoliosDefaultValue);
