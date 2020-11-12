import { createContext } from "react";
import { PortfolioFields } from "../types/portfolio";

export type PortfolioContextType = {
  portfolio: PortfolioFields | null;
};

export const portfolioDefaultValue: PortfolioContextType = {
  portfolio: null
};

export const PortfolioContext = createContext<PortfolioContextType>(
  portfolioDefaultValue
);
