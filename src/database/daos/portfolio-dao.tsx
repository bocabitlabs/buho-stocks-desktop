import sendIpcSql from "message-control/renderer";
import { PortfolioFormFields } from "types/portfolio";
import { deleteById, getById } from "./operations";

export default class PortfolioDAO {
  static addPortfolio = (portfolio: PortfolioFormFields) => {
    //Call the DB

    const sql = `
    INSERT INTO "portfolios"
    (
      "name"
      , "description"
      , "currencyId"
      , "color"
    )
    VALUES (
      '${portfolio.name}'
    , '${portfolio.description}'
    , '${portfolio.currencyId}'
    , '${portfolio.color}'
    );
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
  };
  static getPortfolios = () => {
    //Call the DB
    console.log("Get all portfolios");
    const sql = `
    SELECT * FROM portfolios
    `;

    const results = sendIpcSql(sql);
    return results;
  };

  static getById = (id: string) => {
    //Call the DB
    const results = getById("portfolios", id);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("portfolios", id);
    return results;
  };
}
