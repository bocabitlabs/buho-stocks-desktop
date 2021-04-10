import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { PortfolioFormFields } from "types/portfolio";
import { deleteById } from "./operations/operations";

export default class PortfolioDAO {
  static create = (portfolio: PortfolioFormFields) => {
    //Call the DB

    const sql = `
    INSERT INTO "portfolios"
    (
      "name"
      , "description"
      , "currencyId"
      , "color"
      , "creationDate"
      , "lastUpdateDate"
    )
    VALUES (
      '${portfolio.name}'
    , '${portfolio.description}'
    , '${portfolio.currencyId}'
    , '${portfolio.color}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    );
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
  };

  static getByName = (name: string) => {
    const sql = `SELECT * FROM "portfolios" WHERE "name" = '${name}'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  static exportAll = () => {
    //Call the DB
    console.debug("Export all portfolios");
    const sql = `
    SELECT portfolios.name as name
    , portfolios.color as color
    , portfolios.description as description
    , portfolios.hideClosedCompanies as hideClosedCompanies
	  , currencies.symbol as currencySymbol
	  , currencies.name as currencyName
    , currencies.abbreviation as currencyAbbreviation
    FROM "portfolios"
    LEFT JOIN "currencies"
    ON currencies.id = portfolios.currencyId
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getAll = () => {
    const sql = `
    SELECT portfolios.*
	  , currencies.symbol as currencySymbol
	  , currencies.name as currencyName
    , currencies.country as currencyCountryCode
    FROM "portfolios"
      LEFT JOIN "currencies"
    ON currencies.id = portfolios.currencyId
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getById = (companyId: string) => {
    const sql = `
    SELECT portfolios.*
	  , currencies.symbol as currencySymbol
	  , currencies.name as currencyName
    , currencies.abbreviation as currencyAbbreviation
    , currencies.country as currencyCountryCode
    FROM "portfolios"
      LEFT JOIN "currencies"
    ON currencies.id = portfolios.currencyId
    WHERE portfolios.id = '${companyId}'`;
    const results = sendIpcSql(sql, "get");
    return results;
  };

  static deleteById = (id: string) => {
    const results = deleteById("portfolios", id);
    return results;
  };

  static update = (id: string, element: PortfolioFormFields) => {
    const sql = `
    UPDATE portfolios
    SET
    name = '${element.name}'
    , color = '${element.color}'
    , description = '${element.description}'
    , currencyId = '${element.currencyId}'
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE portfolios.id = '${id}';
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
    WHERE portfolios.id = ${id}
    ORDER BY datetime(sharesTransactions.transactionDate) ASC
    LIMIT 1
    `;
    const results = sendIpcSql(sql, "get");
    return results;
  };
}
