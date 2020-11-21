import { useState, useEffect } from "react";
import { PortfolioContextType } from "../contexts/portfolio";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields } from "../types/portfolio";

export function usePortfolioContext(portfolioId: string): PortfolioContextType {
  const [portfolio, setPortFolio] = useState<PortfolioFields | null>(null);

  useEffect(() => {
    const result = new PortfolioService().getById(portfolioId);
    setPortFolio(result);
  }, [portfolioId])

  return {
    portfolio
  };
}
