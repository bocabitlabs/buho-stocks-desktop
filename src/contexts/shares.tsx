import { createContext } from "react";
import { ShareFields } from "../types/share";

export type SharesContextType = {
  shares: ShareFields[];
};

export const sharesDefaultValue: SharesContextType = {
  shares: []
};

export const SharesContext = createContext<SharesContextType>(
  sharesDefaultValue
);
