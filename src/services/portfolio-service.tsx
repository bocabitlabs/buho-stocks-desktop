import PortfolioDAO from "database/daos/portfolio-dao";
import { PortfolioYearlyProps } from "types/company";
import { PortfolioItemProps } from "types/portfolio";

export default class PortfolioService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  static addPortfolio = (portfolio: PortfolioItemProps) => {
    const result = new PortfolioDAO().addPortfolio(portfolio);
    return result;
  };

  static getPortfolios = () => {
    return new PortfolioDAO().getPortfolios();
  };

  static getById = (portfolioId: string) => {
    return new PortfolioDAO().getById(portfolioId);
  };

  static getYearlySharesData = (portfolioId: string): PortfolioYearlyProps[] => {
    const result =  new PortfolioDAO().getYearlySharesDataById(portfolioId);
    console.log(result)
    return result;
  }

  static getYearlyDividendsData = (portfolioId: string): PortfolioYearlyProps[] => {
    const result = new PortfolioDAO().getYearlyDividendsDataById(portfolioId);
    console.log(result);
    return result;
  }

  static deleteById = (portfolioId: string) => {
    return new PortfolioDAO().deleteById(portfolioId);
  };
}
