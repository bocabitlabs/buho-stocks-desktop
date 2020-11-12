import { useState, useEffect } from "react";
import { MarketsContextType } from "../contexts/markets";
import MarketService from "../services/market-service";
import { MarketFields } from "../types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<MarketFields[]>([]);

  useEffect(() => {
    const result = new MarketService().getMarkets();
    setMarkets(result)
  }, [])

  return {
    markets
  };
}
