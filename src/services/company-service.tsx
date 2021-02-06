import DividendsTransactionsDAO from "database/daos/dividends-transactions-dao";
import SharesTransactionsDAO from "database/daos/shares-transactions-dao";
import { Company } from "models/company";
import { IAddProps } from "types/common";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import CompanyDAO from "../database/daos/company-dao";
import { ICompany, CompanyFormFields } from "../types/company";
import RightsTransactionsService from "./rights-transactions-service";
import StockPriceService from "./stock-price-service";

export default class CompanyService {
  addCompany = (company: CompanyFormFields): IAddProps => {
    return new CompanyDAO().addCompany(company);
  };

  getCompanies = (portfolioId: string): ICompany[] => {
    console.log("CompanyService: getCompanies for portfolio=", portfolioId);
    if (portfolioId === "undefined") {
      console.log("portfolioId is undefined");
      return [];
    }
    const companies = new CompanyDAO().getCompanies(portfolioId);
    let companiesWithDetails: ICompany[] = [];
    companies.forEach((element: ICompany) => {
      const company = this.getCompanyDetails(element.id);
      companiesWithDetails.push(company);
    });
    return companiesWithDetails;
  };

  getCompanyDetails = (companyId: string): Company => {
    const result = new CompanyDAO().getCompany(companyId);
    const sharesTransactions = SharesTransactionsDAO.getSharesTransactions(
      companyId
    );
    const dividendsTransactions = DividendsTransactionsDAO.getAll(companyId);
    const rightsTransactions = RightsTransactionsService.getRightsTransactions(
      companyId
    );
    const stockPrices = StockPriceService.getStockPrices(companyId);

    return createCompany(
      result,
      dividendsTransactions,
      sharesTransactions,
      rightsTransactions,
      stockPrices
    );
  };

  deleteById = (companyId: string) => {
    return new CompanyDAO().deleteById(companyId);
  };
}
function createCompany(
  result: ICompany,
  dividendsTransactions: DividendsTransaction[],
  sharesTransactions: SharesTransaction[],
  rightsTransactions: RightsTransaction[],
  stockPrices: IStockPrice[]
) {
  result.dividendsTransactions = dividendsTransactions;
  result.sharesTransactions = sharesTransactions;
  result.rightsTransactions = rightsTransactions;
  result.stockPrices = stockPrices;
  const company: Company = new Company(result);

  return company;
}
