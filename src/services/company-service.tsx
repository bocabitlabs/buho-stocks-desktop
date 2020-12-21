import CompanyDAO from "../database/daos/company-dao";
import { CompanyItemProps } from "../types/company";

export default class CompanyService {
  addCompany = (company: CompanyItemProps) => {
    return new CompanyDAO().addCompany(company);
  };

  getCompanies = (portfolioId: string) => {
    return new CompanyDAO().getCompanies(portfolioId);
  };

  getCompany = (companyId: string) => {
    return new CompanyDAO().getCompany(companyId);
  };

  getAccumulatedShares = (companyId: string, year: string) => {
    return new CompanyDAO().getAccumulatedShares(companyId, year);
  };

  getCompaniesFromPortfolio = (portfolioId: string) => {
    return new CompanyDAO().getCompaniesFromPortfolio(portfolioId);
  };

  deleteById = (companyId: string) => {
    return new CompanyDAO().deleteById(companyId);
  };
}
