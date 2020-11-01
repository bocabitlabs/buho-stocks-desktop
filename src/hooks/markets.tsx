import { useState, useCallback } from "react";
import { MarketsContextType } from "../contexts/markets";
import {
  getMarkets,
  addMarket as addMarketDAO
} from "../daos/market-dao";
import { MarketFields, MarketItemProps } from "../types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<MarketFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarkets = useCallback(() => {
    setIsLoading(true);
    getMarkets(getCallback);
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
      addMarketDAO(sector, addCallback);
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
