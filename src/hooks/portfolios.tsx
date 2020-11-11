import { useState, useCallback } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);
  const [portfolio, setPortFolio] = useState<PortfolioFields | null>(null);

  const fetchPortfolios = useCallback(() => {
    const result = new PortfolioService().getPortfolios();
    setPortFolios(result);

  }, []);

  // const addPortfolio = (portfolio: PortfolioItemProps) => {
  //   const portfolioService = new PortfolioService();

  //   const added = portfolioService.addPortfolio(portfolio);
  //   return added;
  // };

  const fetchPortfolio = useCallback((portfolioId: string) => {
    const result = new PortfolioService().getPortfolioById(portfolioId);
    setPortFolio(result);
  }, []);

  return {
    portfolios,
    portfolio,
    fetchPortfolios,
    fetchPortfolio,
    // addPortfolio
    // removePost
  };
}
