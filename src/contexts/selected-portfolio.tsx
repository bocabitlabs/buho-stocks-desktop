import { createContext } from "react";

export type SelectedPortfolioContextType = {
  selectedPortfolio: string;
};

export const sectorsDefaultValue: SelectedPortfolioContextType = {
  selectedPortfolio: ''
};

export const SelectedPortfolioContext = createContext<SelectedPortfolioContextType>(
  sectorsDefaultValue
);