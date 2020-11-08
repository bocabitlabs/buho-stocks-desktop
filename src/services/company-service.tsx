import CompanyDAO from "../database/daos/company-dao";
import { CompanyItemProps } from "../types/company";

export default class CompanyService {
  addCompany = (company: CompanyItemProps, callback: Function) => {
    new CompanyDAO().addCompany(company, callback);
  };

  getCompanies = (portfolioId: string, callback: Function) => {
    new CompanyDAO().getCompanies(portfolioId, callback);
  };

  getCompany = (companyId: string, callback: Function) => {
    new CompanyDAO().getCompany(companyId, callback);
  };
}
