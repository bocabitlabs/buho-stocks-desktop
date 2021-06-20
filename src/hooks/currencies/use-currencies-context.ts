import { useState, useEffect, useCallback } from "react";
import { CurrenciesContextType } from "contexts/currencies";
import CurrencyService from "services/currencies/currencies-service";
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

  const getAll = useCallback(() => {
    setIsLoading(true);
    const currencies = CurrencyService.getAll();
    setCurrencies(currencies);
    setIsLoading(false);
    return currencies;
  }, []);

  const create = useCallback((currency: CurrencyFormFields) => {
    setIsLoading(true);
    const result = CurrencyService.create(currency);
    setIsLoading(false);
    return result;
  }, []);

  const deleteById = useCallback((sectorId: string) => {
    setIsLoading(true);
    const results = CurrencyService.deleteById(sectorId);
    setIsLoading(false);
    return results;
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
    getAll,
    create,
    deleteById,
    getById,
    update
  };
}
