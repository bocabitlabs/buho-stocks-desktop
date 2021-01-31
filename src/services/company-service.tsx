import DividendsTransactionsDAO from "database/daos/dividends-transactions-dao";
import SharesTransactionsDAO from "database/daos/shares-transactions-dao";
import { Company } from "models/company";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import CompanyDAO from "../database/daos/company-dao";
import { ICompany, CompanyFormFields } from "../types/company";
import RightsTransactionsService from "./rights-transactions-service";

export default class CompanyService {
  addCompany = (company: CompanyFormFields) => {
    return new CompanyDAO().addCompany(company);
  };

  getCompanies = (portfolioId: string): ICompany[] => {
    return new CompanyDAO().getCompanies(portfolioId);
  };

  getCompanyDetails = (companyId: string): Company => {
    const result = new CompanyDAO().getCompany(companyId);
    const sharesTransactions = SharesTransactionsDAO.getSharesTransactions(
      companyId
    );
    const dividendsTransactions = new DividendsTransactionsDAO().getDividendsTransactions(
      companyId
    );
    const rightsTransactions = RightsTransactionsService.getRightsTransactions(
      companyId
    );

    return createCompany(
      result,
      dividendsTransactions,
      sharesTransactions,
      rightsTransactions
    );
  };

  getCompaniesFromPortfolio = (portfolioId: string) => {
    return new CompanyDAO().getCompaniesFromPortfolio(portfolioId);
  };

  deleteById = (companyId: string) => {
    return new CompanyDAO().deleteById(companyId);
  };
}
function createCompany(
  result: ICompany,
  dividendsTransactions: DividendsTransaction[],
  sharesTransactions: SharesTransaction[],
  rightsTransactions: RightsTransaction[]
) {
  result.dividendsTransactions = dividendsTransactions;
  result.sharesTransactions = sharesTransactions;
  result.rightsTransactions = rightsTransactions;
  const company: Company = new Company(result);

  return company;
}
