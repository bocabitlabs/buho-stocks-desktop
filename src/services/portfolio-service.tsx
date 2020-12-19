import PortfolioDAO from "../database/daos/portfolio-dao";
import { PortfolioYearlyProps } from "../types/company";
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

  getYearlyData = (portfolioId: string): PortfolioYearlyProps[] => {
    const result =  new PortfolioDAO().getYearlyDataById(portfolioId);
    console.log(result)
    return result;
  }

  deleteById = (portfolioId: string) => {
    return new PortfolioDAO().deleteById(portfolioId);
  };
}
