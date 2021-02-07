import { useState, useEffect, useCallback } from "react";
import { PortfoliosContextType } from "contexts/portfolios";
import PortfolioService from "services/portfolio-service";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<IPortfolio[]>([]);
  const [portfolio, setPortFolio] = useState<IPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log("Fetching portfolios from hook useEffect");
    const result = PortfolioService.getAll();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const create = useCallback((portfolio: PortfolioFormFields) => {
    setIsLoading(true);
    const result = PortfolioService.create(portfolio);
    setIsLoading(false);
    return result;
  }, []);

  const deleteById = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const results = PortfolioService.deleteById(portfolioId);
    setIsLoading(false);
    return results;
  }, []);

  const getAll = useCallback(() => {
    setIsLoading(true);
    console.log("Fetching portfolios from hook");
    const results = PortfolioService.getAll();
    setPortFolios(results);
    setIsLoading(false);
    return results;
  }, []);

  const getById = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const result = PortfolioService.getById(portfolioId);
    setPortFolio(result);
    setIsLoading(false);
    return result;
  }, []);

  return {
    isLoading,
    portfolios,
    portfolio,
    create,
    getAll,
    getById,
    deleteById
  };
}
