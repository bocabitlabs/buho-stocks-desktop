import CompanyDAO from "database/daos/company-dao/company-dao";
import DividendsTransactionsDAO from "database/daos/dividends-transaction-dao/dividends-transaction-dao";
import SharesTransactionsDAO from "database/daos/shares-transaction-dao/shares-transactions-dao";
import { Company } from "models/company";
import { IAddProps } from "types/common";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { ICompany, CompanyFormFields } from "types/company";
import { IStockPrice } from "types/stock-price";

import RightsTransactionsService from "../rights-transaction-service/rights-transaction-service";
import StockPriceService from "../stock-price-service/stock-price-service";

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
      const stockPrices = StockPriceService.getAll(companyId);
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

  static getFirstTransaction = (companyId: string) => {
    return CompanyDAO.getFirstTransaction(companyId);
  };
}
function createCompany(
  result: ICompany,
  dividendsTransactions: IDividendsTransaction[],
  sharesTransactions: ISharesTransaction[],
  rightsTransactions: IRightsTransaction[],
  stockPrices: IStockPrice[]
) {
  result.dividendsTransactions = dividendsTransactions;
  result.sharesTransactions = sharesTransactions;
  result.rightsTransactions = rightsTransactions;
  result.stockPrices = stockPrices;
  const company: Company = new Company(result);
  return company;
}
