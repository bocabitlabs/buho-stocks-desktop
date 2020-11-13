import { createContext } from "react";

export type IsCollapsedContextType = {
  isCollapsed: boolean;
};

export const isCollapsedDefaultValue: IsCollapsedContextType = {
  isCollapsed: false
};

export const IsCollapsedContext = createContext<IsCollapsedContextType>(
  isCollapsedDefaultValue
);
