import { useState, useCallback } from "react";
import { MarketsContextType } from "../contexts/markets";
import MarketService from "../services/market-service";
import { MarketFields, MarketItemProps } from "../types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<MarketFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarkets = useCallback(() => {
    console.log("fetching markets")
    setIsLoading(true);
    new MarketService().getMarkets(getCallback);
  }, []);

  const getCallback = (result: MarketFields[]) => {
    setMarkets(result);
    setIsLoading(false);
  };

  const addMarket = useCallback(
    (sector: MarketItemProps) => {
      const addCallback = (result: []) => {
        fetchMarkets();
        console.log(result);
        setIsLoading(false);
      };

      setIsLoading(true);
      new MarketService().addMarket(sector, addCallback);
    },
    [fetchMarkets]
  );

  return {
    markets,
    isLoading,
    fetchMarkets,
    addMarket
  };
}
