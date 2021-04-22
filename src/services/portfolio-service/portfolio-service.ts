import PortfolioDAO from "database/daos/portfolio-dao/portfolio-dao";
import { Portfolio } from "models/portfolio";
import { ICompany } from "types/company";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";
import CompanyService from "../company-service/company-service";

export default class PortfolioService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  static create = (portfolio: PortfolioFormFields) => {
    const result = PortfolioDAO.create(portfolio);
    return result;
  };

  static getByName = (name: string) => {
    return PortfolioDAO.getByName(name);
  };

  static exportAll = (): IPortfolio[] => {
    const results = PortfolioDAO.exportAll();
    return results;
  };

  static getAll = (): IPortfolio[] => {
    const portfoliosData = PortfolioDAO.getAll();
    let portfoliosWithDetails: IPortfolio[] = [];
    if (portfoliosData === undefined) {
      return portfoliosWithDetails;
    }

    portfoliosData.forEach((element: IPortfolio) => {
      const portfolio = PortfolioService.getById(element.id);
      if (portfolio !== null) {
        portfoliosWithDetails.push(portfolio);
      }
    });

    return portfoliosWithDetails;
  };

  static getById = (portfolioId: string): IPortfolio | null => {
    const data = PortfolioDAO.getById(portfolioId);
    const companiesData = CompanyService.getAll(portfolioId);
    const portfolio = createPortfolioObject(data, companiesData);
    return portfolio;
  };

  static deleteById = (portfolioId: string) => {
    return PortfolioDAO.deleteById(portfolioId);
  };

  static update = (portfolioId: string, portfolio: PortfolioFormFields) => {
    return PortfolioDAO.update(portfolioId, portfolio);
  };

  static getFirstTransaction = (portfolioId: string) => {
    return PortfolioDAO.getFirstTransaction(portfolioId);
  };
}

function createPortfolioObject(result: IPortfolio, companies: ICompany[]) {
  if (result === undefined) {
    return null;
  }
  result.companies = companies;
  const portfolio: Portfolio = new Portfolio(result);

  return portfolio;
}
