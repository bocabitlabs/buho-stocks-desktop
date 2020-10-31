import { createContext } from "react";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export type PortfoliosContextType = {
  portfolios: PortfolioFields[];
  isLoading: boolean;
  fetchPortfolios: () => void;
  addPortfolio: (portfolio: PortfolioItemProps) => void;
};

export const settingsDefaultValue: PortfoliosContextType = {
  portfolios: [],
  isLoading: false,
  fetchPortfolios: () => null,
  addPortfolio: () => null
}

export const PortfoliosContext = createContext<PortfoliosContextType>(settingsDefaultValue);
