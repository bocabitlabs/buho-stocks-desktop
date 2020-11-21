import { createContext } from "react";
import { PortfolioFields } from "../types/portfolio";

export type PortfoliosContextType = {
  portfolios: PortfolioFields[];
};

export const portfoliosDefaultValue: PortfoliosContextType = {
  portfolios: []
};

export const PortfoliosContext = createContext<PortfoliosContextType>(
  portfoliosDefaultValue
);
