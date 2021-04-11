import CompanyDAO from "database/daos/company-dao/company-dao";
import DividendsTransactionsDAO from "database/daos/dividends-transactions-dao/dividends-transactions-dao";
import SharesTransactionsDAO from "database/daos/shares-transaction-dao/shares-transactions-dao";
import { Company } from "models/company";
import { IAddProps } from "types/common";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { ICompany, CompanyFormFields } from "types/company";
import { IStockPrice } from "types/stock-price";

import RightsTransactionsService from "../rights-transactions-service";
import StockPriceService from "../stock-price-service";

export default class CompanyService {
  static create = (company: CompanyFormFields): IAddProps => {
    const result = CompanyDAO.create(company);
    return result;
  };

  static exportAll = (): ICompany[] => {
    const companies = CompanyDAO.exportAll();
    return companies;
  };

  static getByTicker = (ticker: string) => {
    return CompanyDAO.getByTicker(ticker);
  };

  static getByTickerPortfolio = (ticker: string, portfolioId: string) => {
    return CompanyDAO.getByTickerPortfolio(ticker, portfolioId);
  };

  static getAll = (portfolioId: string): ICompany[] => {
    if (portfolioId === "undefined") {
      return [];
    }
    const companies = CompanyDAO.getAll(portfolioId);
    let companiesWithDetails: ICompany[] = [];
    companies.forEach((element: ICompany) => {
      const company = CompanyService.getById(element.id);
      if (company) {
        companiesWithDetails.push(company);
      }
    });
    return companiesWithDetails;
  };

  static getById = (companyId: string): Company | null => {
    const result = CompanyDAO.getById(companyId);
    if (result) {
      const sharesTransactions = SharesTransactionsDAO.getAll(companyId);
      const dividendsTransactions = DividendsTransactionsDAO.getAll(companyId);
      const rightsTransactions = RightsTransactionsService.getAll(companyId);
      const stockPrices = StockPriceService.getStockPrices(companyId);
      return createCompany(
        result,
        dividendsTransactions,
        sharesTransactions,
        rightsTransactions,
        stockPrices
      );
    }
    return null;
  };

  static deleteById = (companyId: string) => {
    const result = CompanyDAO.deleteById(companyId);
    return result;
  };

  static update = (companyId: string, company: CompanyFormFields) => {
    return CompanyDAO.update(companyId, company);
  };

  static getFirstTransaction = (portfolioId: string) => {
    return CompanyDAO.getFirstTransaction(portfolioId);
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