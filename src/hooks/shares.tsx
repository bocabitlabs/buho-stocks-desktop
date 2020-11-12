import { useState, useEffect } from "react";
import { SharesContextType } from "../contexts/shares";
import ShareService from "../services/share-service";
import { ShareFields } from "../types/share";

export function useSharesContext(companyId: string): SharesContextType {
  const [shares, setShares] = useState<ShareFields[]>([]);

  useEffect(() => {
    const results = new ShareService().getShares(companyId);
    setShares(results);
  }, [companyId])

  return {
    shares,
  };
}
