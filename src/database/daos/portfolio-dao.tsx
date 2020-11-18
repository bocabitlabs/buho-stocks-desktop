import sendIpcSql from "../../message-control/renderer";
import { PortfolioItemProps } from "../../types/portfolio";

export default class PortfolioDAO {
  addPortfolio = (portfolio: PortfolioItemProps) => {
    //Call the DB

    const sql = `INSERT INTO "portfolios"
    ("name", "description", "currencyId", "color")
    VALUES ('${portfolio.name}', '${portfolio.description}', '${portfolio.currencyId}', '${portfolio.color}');`;

    const result = sendIpcSql(sql, "insert");
    return result;
  };
  getPortfolios = () => {
    //Call the DB
    console.log("Get all portfolios");
    const sql = `SELECT * FROM portfolios`;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  getPortfolioById = (portfolioId: string) => {
    //Call the DB
    console.log("Get portfolio by ID");
    const sql = `SELECT * FROM portfolios WHERE "id" = '${portfolioId}'`;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    return results;
  };

  deletePortfolioById = (portfolioId: string) => {
    //Call the DB
    console.log("Delete portfolio by ID");
    const sql = `DELETE FROM portfolios WHERE "id" = '${portfolioId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}
