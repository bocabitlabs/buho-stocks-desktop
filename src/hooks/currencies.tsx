import { useState, useEffect, useCallback } from "react";
import { CurrenciesContextType } from "contexts/currencies";
import CurrencyService from "services/currency-service";
import { ICurrency, CurrencyFormFields } from "types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currency, setCurrency] = useState<ICurrency|null>(null);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const currencies = CurrencyService.getAll();
    setCurrencies(currencies);
    setIsLoading(false);
  }, []);

  const fetchCurrencies = useCallback(() => {
    setIsLoading(true);
    const currencies = CurrencyService.getAll();
    setCurrencies(currencies);
    setIsLoading(false);
  }, []);

  const create = useCallback((currency: CurrencyFormFields) => {
    setIsLoading(true);
    const result = CurrencyService.create(currency);
    setIsLoading(false);
    return result;
  }, []);

  const getById = useCallback((id: string) => {
    setIsLoading(true);
    const result = CurrencyService.getById(id);
    setCurrency(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((companyId: string, company: CurrencyFormFields) => {
    setIsLoading(true);
    const result = CurrencyService.update(companyId, company);
    setIsLoading(false);
    return result;
  }, []);

  return {
    currency,
    currencies,
    isLoading,
    fetchCurrencies,
    create,
    getById,
    update
  };
}
