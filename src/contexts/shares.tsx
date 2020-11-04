import { createContext } from "react";
import { ShareFields, ShareItemProps } from "../types/share";

export type SharesContextType = {
  shares: ShareFields[];
  isLoading: boolean;
  fetchShares: (companyId: string) => void;
  addShare: (share: ShareItemProps) => void;
};

export const sharesDefaultValue: SharesContextType = {
  shares: [],
  isLoading: false,
  fetchShares: () => null,
  addShare: () => null
}

export const SharesContext = createContext<SharesContextType>(sharesDefaultValue);
