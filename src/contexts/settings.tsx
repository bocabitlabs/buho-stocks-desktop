import { createContext } from "react";
import { SettingsItemProps } from "../types/settings";

export type SettingsContextType = {
  settings: SettingsItemProps[];
  isLoading: boolean;
  fetchSettings: () => void;
  updateSelectedPortfolio: (portfolioId: string) => void;
  toggleCollapsed: () => void;

};

export const settingsDefaultValue: SettingsContextType = {
  settings: [],
  isLoading: false,
  fetchSettings: () => null,
  updateSelectedPortfolio: () => null,
  toggleCollapsed: () => null,
}

export const SettingsContext = createContext<SettingsContextType>(settingsDefaultValue);
