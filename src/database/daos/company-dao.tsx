import moment from "moment";
import sendIpcSql from "message-control/renderer";
import { ICompany, CompanyFormFields } from "types/company";
import { deleteById } from "./operations";

export default class CompanyDAO {
  addCompany = (company: CompanyFormFields) => {
    //Call the DB
    const sql = `INSERT INTO "companies"
    ("name"
    , "ticker"
    , "broker"
    , "description"
    , "sectorId"
    , "marketId"
    , "currencyId"
    , "portfolioId"
    , "url"
    , "color"
    , "creationDate"
    , "lastUpdateDate"
    )
    VALUES ('${company.name}'
    , '${company.ticker}'
    , '${company.broker}'
    , '${company.description}'
    , '${company.sector}'
    , '${company.market}'
    , '${company.currency}'
    , '${company.portfolioId}'
    , '${company.url}'
    , '${company.color}'
    , '${moment(new Date())}'
    , '${moment(new Date())}'
    ) ;`;

    const result = sendIpcSql(sql, "insert");
    return result;
  };

  exportAll = () => {
    //Call the DB
    console.log("Export all companies");
    const sql = `
    SELECT *
    FROM "companies";
    `;
    const results = sendIpcSql(sql);
    if (results.length > 0) {
      return [];
    }
    console.log(results)
    return results;
  };

  getCompanies = (portfolioId: string) => {
    //Call the DB
    console.log("Get all companies from portfolio");
    const sql = `
    SELECT companies.*
      , sectors.name as sectorName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol
      , S.buySharesNumber
      , S.sellSharesNumber
      , S.buyTotal
      , S.sellTotal
      , S.sellCommission
      , S.buyCommission
      , S.lastTransactionDate
      , portfolios.name as portfolioName

    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN (SELECT companyId
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.count ELSE 0 END) as buySharesNumber
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.count ELSE 0 END) as sellSharesNumber
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as buyTotal
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as sellTotal
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.commission ELSE 0 END) as buyCommission
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.commission ELSE 0 END) as sellCommission
      , max(transactionDate) as lastTransactionDate
    FROM "sharesTransactions"
      GROUP BY sharesTransactions.companyId) AS S
      ON companies.id = S.companyId
    WHERE companies.portfolioId = '${portfolioId}';
    `;
    const results = sendIpcSql(sql);
    if (results.length > 0 && results[0].id == null) {
      return [];
    }
    return results;
  };
  getCompany = (companyId: string): ICompany => {
    //Call the DB
    console.log("Get company");
    const sql = `
    SELECT companies.*
      , portfolios.name as portfolioName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol
      , currencies.abbreviation as currencyAbbreviation
	  , sectors.name as sectorName
	  , currencies2.symbol as portfolioCurrencySymbol
    , currencies2.abbreviation as portfolioCurrencyAbbreviation
    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN "currencies" as currencies2
      ON portfolios.currencyId = currencies2.id
    WHERE companies.id = '${companyId}';
    `;

    const results = sendIpcSql(sql, "get");
    console.log(results);

    return results;
  };

  getCompaniesFromPortfolio = (portfolioId: string) => {
    const sql = `
    SELECT
      id, name
      FROM  "companies"
      WHERE companies.portfolioId='${portfolioId}'
      ;
    `;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("companies", id);
    return results;
  };
}
