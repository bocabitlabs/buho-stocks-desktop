import { useState, useEffect, useCallback } from "react";
import SectorService from "services/sector-service/sector-service";
import { ExchangeRatesContextType } from "contexts/exchange-rates";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";
import ExchangeRateService from "services/exchange-rate-service/exchange-rate";

export function useSectorsContext(): ExchangeRatesContextType {
  const [exchangeRates, setExchangeRates] = useState<IExchangeRate[]>([]);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate| null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = ExchangeRateService.getAll();
    setExchangeRates(results);
  }, []);

  const add = useCallback(
    (sector: IExchangeRateForm) => {
      setIsLoading(true);
      const results = SectorService.getAll();
      setExchangeRates(results);
    },
    []
  );

  const fetchAll = useCallback(() => {
    setIsLoading(true);
    const results = ExchangeRateService.getAll();
    setExchangeRates(results);
    setIsLoading(false);
  }, []);

  const get = useCallback((transactionDate: string, exchangeName: string) => {
    setIsLoading(true);
    const result = ExchangeRateService.get(transactionDate, exchangeName);
    setExchangeRate(result);
    setIsLoading(false);
  }, []);

  return {
    exchangeRates,
    exchangeRate,
    isLoading,
    fetchAll,
    add,
    get
  };
}
