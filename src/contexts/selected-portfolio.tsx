import { createContext } from "react";
import { IAddProps } from "types/common";

export type SelectedPortfolioContextType = {
  selectedPortfolio: string;
  update: (selectedPortfolio: string) => IAddProps
};

export const sectorsDefaultValue: SelectedPortfolioContextType = {
  selectedPortfolio: '',
  update: () =>  ({changes: false})
};

export const SelectedPortfolioContext = createContext<SelectedPortfolioContextType>(
  sectorsDefaultValue
);