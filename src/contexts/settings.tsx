import { createContext } from "react";
import { ISettings } from "types/settings";

interface IUpdateResponse{
  changes: boolean;
}

export type SettingsContextType = {
  settings: ISettings | null;
  isLoading: boolean;
  updateDatabasePath: (newValue: string) => IUpdateResponse;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: null,
  isLoading: false,
  updateDatabasePath: () => ({changes: false})
};

export const SettingsContext = createContext<SettingsContextType>(
  settingsDefaultValue
);
