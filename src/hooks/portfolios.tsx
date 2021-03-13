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
    const result = PortfolioService.getAll();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const deleteById = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const results = PortfolioService.deleteById(portfolioId);
    setIsLoading(false);
    return results;
  }, []);

  const getAll = useCallback(() => {
    setIsLoading(true);
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

  const create = useCallback(
    (portfolio: PortfolioFormFields) => {
      console.debug("Creating new portfolio");
      setIsLoading(true);
      const result = PortfolioService.create(portfolio);
      if (result.changes) {
        getAll();
      }
      setIsLoading(false);
      return result;
    },
    [getAll]
  );

  const update = useCallback(
    (portfolioId: string, portfolio: PortfolioFormFields) => {
      setIsLoading(true);
      const result = PortfolioService.update(portfolioId, portfolio);
      setPortFolio(result);
      setIsLoading(false);
      return result;
    },
    []
  );

  return {
    isLoading,
    portfolios,
    portfolio,
    create,
    getAll,
    getById,
    deleteById,
    update
  };
}
