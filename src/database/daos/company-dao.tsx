import moment from "moment";
import sendIpcSql from "message-control/renderer";
import { ICompany, CompanyFormFields } from "types/company";
import { deleteById } from "./operations/operations";

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
    , "alternativeTickers"
    , "countryCode"
    , "dividendsCurrencyId"
    )
    VALUES ('${company.name}'
    , '${company.ticker}'
    , '${company.broker}'
    , '${company.description}'
    , '${company.sectorId}'
    , '${company.marketId}'
    , '${company.currencyId}'
    , '${company.portfolioId}'
    , '${company.url}'
    , '${company.color}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , '${company.alternativeTickers}'
    , '${company.countryCode}'
    , '${company.dividendsCurrencyId}'
    ) ;`;

    const result = sendIpcSql(sql, "insert");
    return result;
  };

  exportAll = () => {
    //Call the DB
    console.debug("Export all companies");
    const sql = `
    SELECT companies.name as name
      , companies.color as color
      , companies.ticker as ticker
      , companies.description as description
      , companies.broker as broker
      , companies.url as url
      , companies.closed as closed
      , sectors.name as sectorName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol
      , portfolios.name as portfolioName
      , markets.name as marketName
      , companies.alternativeTickers as alternativeTickers
      , companies.countryCode as countryCode
      , companies.dividendsCurrencyId as dividendsCurrencyId
    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN "markets"
      ON markets.id = companies.marketId
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getByTicker = (ticker: string) => {
    const sql = `SELECT * FROM "companies" WHERE "ticker" = '${ticker}'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  static getByTickerPortfolio = (ticker: string, portfolioId: string) => {
    const sql = `SELECT * FROM "companies" WHERE "ticker" = '${ticker}' AND "portfolioId"= '${portfolioId}'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  getCompanies = (portfolioId: string) => {
    //Call the DB
    const sql = `
    SELECT companies.*
      , sectors.name as sectorName
      , superSectors.name as superSectorName
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
      , currencies2.symbol as dividendsCurrencySymbol
      , currencies2.abbreviation as dividendsCurrencyAbbreviation
    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "currencies" as currencies2
      ON currencies2.id = companies.dividendsCurrencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN "sectors" as superSectors
      ON sectors.superSectorId = superSectors.id
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
    WHERE companies.portfolioId = '${portfolioId}'
    ORDER BY name ASC
    ;
    `;
    const results = sendIpcSql(sql);
    if (results.length > 0 && results[0].id == null) {
      return [];
    }
    return results;
  };
  getCompany = (companyId: string): ICompany => {
    //Call the DB
    const sql = `
    SELECT companies.*
      , portfolios.name as portfolioName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol
      , currencies.abbreviation as currencyAbbreviation
	  , sectors.name as sectorName
    , superSectors.name as superSectorName
	  , currencies2.symbol as portfolioCurrencySymbol
    , currencies2.abbreviation as portfolioCurrencyAbbreviation
    , currencies3.symbol as dividendsCurrencySymbol
    , currencies3.abbreviation as dividendsCurrencyAbbreviation
    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN "sectors" as superSectors
      ON superSectors.id = sectors.superSectorId
    LEFT JOIN "currencies" as currencies2
      ON portfolios.currencyId = currencies2.id
    LEFT JOIN "currencies" as currencies3
      ON currencies3.id = companies.dividendsCurrencyId
    WHERE companies.id = '${companyId}';
    `;

    const results = sendIpcSql(sql, "get");

    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("companies", id);
    return results;
  };

  update = (companyId: string, company: CompanyFormFields) => {
    const sql = `
    UPDATE companies
    SET
    name = '${company.name}'
    , ticker = '${company.ticker}'
    , broker = '${company.broker}'
    , alternativeTickers = '${company.alternativeTickers}'
    , description = '${company.description}'
    , url = '${company.url}'
    , color = '${company.color}'
    , closed = '${company.closed ? 1 : 0}'
    , currencyId = '${company.currencyId}'
    , marketId = '${company.marketId}'
    , sectorId = '${company.sectorId}'
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , countryCode = '${company.countryCode}'
    , dividendsCurrencyId = '${company.dividendsCurrencyId}'
    WHERE companies.id = '${companyId}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };

  static getFirstTransaction = (id: string) => {
    const sql = `
      SELECT
      sharesTransactions.count as count
      , sharesTransactions.price as price
      , sharesTransactions.commission as commission
      , sharesTransactions.color as color
      , sharesTransactions.transactionDate as transactionDate
      , sharesTransactions.exchangeRate as exchangeRate
      , sharesTransactions.notes as notes
      , sharesTransactions.type as type
      , companies.name as companyName
      , companies.ticker as ticker
      , portfolios.name as portfolioName
    FROM "sharesTransactions"
    LEFT JOIN "companies"
      ON companies.id = sharesTransactions.companyId
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    WHERE companies.id = ${id}
    ORDER BY datetime(sharesTransactions.transactionDate) ASC
    LIMIT 1
    `;
    const results = sendIpcSql(sql, "get");
    return results;
  };
}
