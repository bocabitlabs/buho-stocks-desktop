import { createContext } from "react";
import { ISettings } from "types/settings";

interface IUpdateResponse{
  changes: boolean;
}

export type SettingsContextType = {
  settings: ISettings | null;
  toggleCollapsed: () => void;
  getSettings: () => ISettings|null;
  setDefaultCompanyDisplayMode: (value: string) => void;
  isLoading: boolean;
  updateDatabasePath: (newValue: string) => IUpdateResponse;
  updateLanguage: (newValue: string) => IUpdateResponse;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: null,
  isLoading: false,
  getSettings: () => null,
  toggleCollapsed: () => null,
  setDefaultCompanyDisplayMode: (value: string) => null,
  updateDatabasePath: () => ({changes: false}),
  updateLanguage: (newValue: string) => ({changes: false})
};

export const SettingsContext = createContext<SettingsContextType>(
  settingsDefaultValue
);
