import sendIpcSql from "../../message-control/renderer";
import { PortfolioItemProps } from "../../types/portfolio";

export default class PortfolioDAO {
  addPortfolio = (portfolio: PortfolioItemProps, callback: Function) => {
    //Call the DB

    const sql = `INSERT INTO "portfolios"
    ("name", "description", "currencyId")
    VALUES ('${portfolio.name}', '${portfolio.description}', '${portfolio.currencyId}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  };
  getPortfolios = (callback: Function) => {
    //Call the DB
    console.log("Get all portfolios");
    const sql = `SELECT * FROM portfolios`;
    const results = sendIpcSql(sql);
    console.log(results);
    callback(results);
  };

  getPortfolioById = (portfolioId: string, callback: Function) => {
    //Call the DB
    console.log("Get portfolio by ID");
    const sql = `SELECT * FROM portfolios WHERE "id" = '${portfolioId}'`;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    callback(results);
  };
}
