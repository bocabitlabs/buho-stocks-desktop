import { createContext } from "react";
import { SettingsItemProps } from "../types/settings";

export type SettingsContextType = {
  settings: SettingsItemProps[];
  isLoading: boolean;
  fetchSettings: (settings: SettingsItemProps[]) => void;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: [],
  isLoading: false,
  fetchSettings: () => null,
}

export const SettingsContext = createContext<SettingsContextType>(settingsDefaultValue);

// export const SettingsContext = createContext<
//   SettingsContextType
// >({
//   settings: [],
// });
// export const useSettings = () => useContext(SettingsContext);
