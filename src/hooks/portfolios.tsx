import { useState, useEffect } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);

  useEffect(() => {
    const result = new PortfolioService().getPortfolios();
    setPortFolios(result);
  }, [])

  return {
    portfolios
  };
}
