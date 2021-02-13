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
      , "creation_date"
      , "last_update_date"
    )
    VALUES (
      '${portfolio.name}'
    , '${portfolio.description}'
    , '${portfolio.currencyId}'
    , '${portfolio.color}'
    , '${moment(new Date())}'
    , '${moment(new Date())}'
    );
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
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
    console.log("results", results)
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
}
