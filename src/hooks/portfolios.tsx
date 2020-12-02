import { useState, useEffect, useCallback } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);
  const [portfolio, setPortFolio] = useState<PortfolioFields|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const result = new PortfolioService().getPortfolios();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const fetchPortfolios = useCallback(() => {
    setIsLoading(true);
    const result = new PortfolioService().getPortfolios();
    setPortFolios(result);
    setIsLoading(false);
  }, []);

  const addPortfolio = useCallback((portfolio: PortfolioItemProps) => {
    setIsLoading(true);
    const result = new PortfolioService().addPortfolio(portfolio);
    setIsLoading(false);
    return result;
  }, []);

  const fetchPortfolio = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const result = new PortfolioService().getById(portfolioId);
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
