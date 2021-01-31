import PortfolioDAO from "database/daos/portfolio-dao";
import { PortfolioFormFields } from "types/portfolio";

export default class PortfolioService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  static addPortfolio = (portfolio: PortfolioFormFields) => {
    const result = PortfolioDAO.addPortfolio(portfolio);
    return result;
  };

  static getPortfolios = () => {
    return PortfolioDAO.getPortfolios();
  };

  static getById = (portfolioId: string) => {
    return PortfolioDAO.getById(portfolioId);
  };

  static deleteById = (portfolioId: string) => {
    return PortfolioDAO.deleteById(portfolioId);
  };
}
