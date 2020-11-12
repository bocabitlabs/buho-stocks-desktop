import { createContext } from "react";
import { SettingsItemProps } from "../types/settings";

export type IsCollapsedContextType = {
  isCollapsed: boolean;
  fetchIsCollapsed: () => void;
  toggleCollapsed: () => string;
};

export const isCollapsedDefaultValue: IsCollapsedContextType = {
  isCollapsed: false,
  fetchIsCollapsed: () => null,
  toggleCollapsed: () => ""
};

export const IsCollapsedContext = createContext<IsCollapsedContextType>(
  isCollapsedDefaultValue
);

export type SettingsContextType = {
  settings: SettingsItemProps | null;
};

export const settingsDefaultValue: SettingsContextType = {
  settings: null
};

export const SettingsContext = createContext<SettingsContextType>(
  settingsDefaultValue
);
