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

  getById = (portfolioId: string) => {
    return new PortfolioDAO().getById(portfolioId);
  };

  deleteById = (portfolioId: string) => {
    return new PortfolioDAO().deleteById(portfolioId);
  };
}
