import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { PortfolioFormFields } from "types/portfolio";
import { deleteById } from "./operations";

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
    FROM "portfolios"
      LEFT JOIN "currencies"
    ON currencies.id = portfolios.currencyId
    `;
    const results = sendIpcSql(sql);
    console.debug("results", results)
    return results;
  };

  static getById = (companyId: string) => {
    const sql = `
    SELECT portfolios.*
	  , currencies.symbol as currencySymbol
	  , currencies.name as currencyName
    , currencies.abbreviation as currencyAbbreviation
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
}
