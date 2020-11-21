import sendIpcSql from "../../message-control/renderer";
import { PortfolioItemProps } from "../../types/portfolio";
import { deleteById, getById } from "./operations";

export default class PortfolioDAO {
  addPortfolio = (portfolio: PortfolioItemProps) => {
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
  getPortfolios = () => {
    //Call the DB
    console.log("Get all portfolios");
    const sql = `
    SELECT * FROM portfolios
    `;

    const results = sendIpcSql(sql);
    return results;
  };

  getById = (id: string) => {
    //Call the DB
    const results = getById("portfolios", id);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("portfolios", id);
    return results;
  };
}
