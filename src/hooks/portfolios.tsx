import { useState, useCallback, useEffect } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);
  // const [portfolio, setPortFolio] = useState<PortfolioFields | null>(null);

  useEffect(() => {
    const result = new PortfolioService().getPortfolios();
    setPortFolios(result);
  }, [])

  // const fetchPortfolio = (portfolioId: string) => {
  //   const result = new PortfolioService().getPortfolioById(portfolioId);
  //   setPortFolio(result);
  // };

  return {
    portfolios,
    // portfolio,
    // fetchPortfolio
  };
}
