import PortfolioDAO from "../database/daos/portfolio-dao";
import { PortfolioItemProps } from "../types/portfolio";

export default class MarketService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  addPortfolio = (portfolio: PortfolioItemProps, callback: Function) => {
    new PortfolioDAO().addPortfolio(portfolio, callback);
  };

  getPortfolios = (callback: Function) => {
    new PortfolioDAO().getPortfolios(callback);
  };

  getPortfolioById = (portfolioId: string, callback: Function) => {
    new PortfolioDAO().getPortfolioById(portfolioId, callback);
  };
}
