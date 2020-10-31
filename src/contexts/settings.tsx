import { createContext } from "react";
import { SettingsItemProps } from "../types/settings";

export type SettingsContextType = {
  settings: SettingsItemProps[];
  isLoading: boolean;
  fetchSettings: () => void;
  updateSettings: (settings: SettingsItemProps) => void;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: [],
  isLoading: false,
  fetchSettings: () => null,
  updateSettings: () => null,
}

export const SettingsContext = createContext<SettingsContextType>(settingsDefaultValue);
