import PortfolioDAO from "database/daos/portfolio-dao";
import { Portfolio } from "models/portfolio";
import { ICompany } from "types/company";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";
import CompanyService from "./company-service";

export default class PortfolioService {
  /**
   * Add a new portfolio
   * @param portfolio
   */
  static addPortfolio = (portfolio: PortfolioFormFields) => {
    const result = PortfolioDAO.addPortfolio(portfolio);
    return result;
  };

  static getPortfolios = (): IPortfolio[] => {
    console.log("Portfolio Service: getPortfolios");
    const portfoliosData = PortfolioDAO.getPortfolios();
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
    console.log(`PortfolioService: Getting portfolio info: id=${portfolioId}`);
    const data = PortfolioDAO.getById(portfolioId);
    console.log(
      `PortfolioService: Getting portfolio info companies: id=${portfolioId}`
    );
    const companiesData = new CompanyService().getCompanies(portfolioId);
    console.log(
      `PortfolioService: Creating portfolio from info: id=${portfolioId}`,
      data,
      companiesData
    );
    const portfolio = createPortfolio(data, companiesData);
    return portfolio;
  };

  static deleteById = (portfolioId: string) => {
    return PortfolioDAO.deleteById(portfolioId);
  };
}

function createPortfolio(result: IPortfolio, companies: ICompany[]) {
  if (result === undefined) {
    return null;
  }
  console.log(`PortfolioService (createPortfolio):`, result, companies);
  result.companies = companies;
  const portfolio: Portfolio = new Portfolio(result);

  return portfolio;
}
