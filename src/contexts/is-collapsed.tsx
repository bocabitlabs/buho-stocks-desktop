import { createContext } from "react";

export type IsCollapsedContextType = {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
};

export const isCollapsedDefaultValue: IsCollapsedContextType = {
  isCollapsed: false,
  toggleCollapsed: () => null,
};

export const IsCollapsedContext = createContext<IsCollapsedContextType>(
  isCollapsedDefaultValue
);
