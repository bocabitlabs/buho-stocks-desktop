import { useState, useEffect, useCallback } from "react";
import { PortfoliosContextType } from "contexts/portfolios";
import PortfolioService from "services/portfolio-service";
import { Portfolio, PortfolioFormFields } from "types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<Portfolio[]>([]);
  const [portfolio, setPortFolio] = useState<Portfolio|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const result = PortfolioService.getPortfolios();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const fetchPortfolios = useCallback(() => {
    setIsLoading(true);
    const result = PortfolioService.getPortfolios();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const addPortfolio = useCallback((portfolio: PortfolioFormFields) => {
    setIsLoading(true);
    const result = PortfolioService.addPortfolio(portfolio);
    setIsLoading(false);
    return result;
  }, []);

  const fetchPortfolio = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const result = PortfolioService.getById(portfolioId);
    setPortFolio(result);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    portfolios,
    portfolio,
    fetchPortfolios,
    fetchPortfolio,
    addPortfolio
  };
}
