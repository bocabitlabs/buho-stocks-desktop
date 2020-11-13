import { createContext } from "react";
import { SettingsItemProps } from "../types/settings";

export type SettingsContextType = {
  settings: SettingsItemProps | null;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: null
};

export const SettingsContext = createContext<SettingsContextType>(
  settingsDefaultValue
);
