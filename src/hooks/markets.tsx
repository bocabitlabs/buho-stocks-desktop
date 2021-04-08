import { useState, useEffect, useCallback } from "react";
import { MarketsContextType } from "contexts/markets";
import MarketService from "services/market-service";
import { IMarket, MarketFormProps } from "types/market";

export function useMarketsContext(): MarketsContextType {
  const [market, setMarket] = useState<IMarket|null>(null);
  const [markets, setMarkets] = useState<IMarket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = MarketService.getAll();
    setMarkets(result);
  }, []);


  const fetchMarkets = useCallback(() => {
    setIsLoading(true);
    const result = MarketService.getAll();
    setMarkets(result);
    setIsLoading(false);
  }, []);

  const create = useCallback((market: MarketFormProps) => {
    setIsLoading(true);
    const result = MarketService.create(market);
    setIsLoading(false);
    return result
  }, []);

  const getById = useCallback((id: string) => {
    setIsLoading(true);
    const result = MarketService.getById(id);
    setMarket(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((id: string, market: MarketFormProps) => {
    setIsLoading(true);
    const result = MarketService.update(id, market);
    setIsLoading(false);
    return result;
  }, []);

  return {
    market,
    markets,
    isLoading,
    fetchMarkets,
    create,
    getById,
    update
  };
}
