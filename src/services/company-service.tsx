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

  deleteCompany = (companyId: string) => {
    return new CompanyDAO().deleteCompanyById(companyId);
  };
}
