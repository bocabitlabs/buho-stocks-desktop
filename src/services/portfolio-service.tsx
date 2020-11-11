import PortfolioDAO from "../database/daos/portfolio-dao";
import { PortfolioItemProps } from "../types/portfolio";

export default class PortfolioService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  addPortfolio = (portfolio: PortfolioItemProps) => {
    const result = new PortfolioDAO().addPortfolio(portfolio);
    return result;
  };

  getPortfolios = () => {
    return new PortfolioDAO().getPortfolios();
  };

  getPortfolioById = (portfolioId: string) => {
    return new PortfolioDAO().getPortfolioById(portfolioId);
  };

  deletePortfolioById = (portfolioId: string) => {
    return new PortfolioDAO().deletePortfolioById(portfolioId);
  };
}
