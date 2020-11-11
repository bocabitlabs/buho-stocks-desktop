import { createContext } from "react";
import { ShareFields } from "../types/share";

export type SharesContextType = {
  shares: ShareFields[];
  fetchShares: (companyId: string) => void;
};

export const sharesDefaultValue: SharesContextType = {
  shares: [],
  fetchShares: () => null,
}

export const SharesContext = createContext<SharesContextType>(sharesDefaultValue);
