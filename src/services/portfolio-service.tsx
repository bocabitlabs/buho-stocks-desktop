import PortfolioDAO from "database/daos/portfolio-dao";
import { PortfolioYearlyProps } from "types/company";
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

  static getYearlySharesData = (portfolioId: string): PortfolioYearlyProps[] => {
    const result =  PortfolioDAO.getYearlySharesDataById(portfolioId);
    console.log(result)
    return result;
  }

  static getYearlyDividendsData = (portfolioId: string): PortfolioYearlyProps[] => {
    const result = PortfolioDAO.getYearlyDividendsDataById(portfolioId);
    console.log(result);
    return result;
  }

  static deleteById = (portfolioId: string) => {
    return PortfolioDAO.deleteById(portfolioId);
  };
}
