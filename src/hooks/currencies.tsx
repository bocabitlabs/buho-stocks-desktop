import { useState, useCallback } from "react";
import { CurrenciesContextType } from "../contexts/currencies";
import {
  getCurrencies,
  addCurrency as addCurrencyDAO
} from "../daos/currency-dao";
import { CurrencyFields, CurrencyItemProps } from "../types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currencies, setCurrencies] = useState<CurrencyFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrencies = useCallback(() => {
    setIsLoading(true);
    getCurrencies(getCallback);
  }, []);

  const getCallback = (result: CurrencyFields[]) => {
    setCurrencies(result);
    setIsLoading(false);
  };

  const addCurrency = useCallback(
    (currency: CurrencyItemProps) => {
      const addCurrenciesCallback = (result: []) => {
        fetchCurrencies();
        console.log(result);
        setIsLoading(false);
      };

      setIsLoading(true);
      addCurrencyDAO(currency, addCurrenciesCallback);
    },
    [fetchCurrencies]
  );

  return {
    currencies,
    isLoading,
    fetchCurrencies,
    addCurrency
  };
}
