import sendSql from "../message-control/renderer";
import { PortfolioItemProps } from "../types/portfolio";

/**
 * Add a new portfolio
 * @param portfolio
 */
export function addPortfolio(
  portfolio: PortfolioItemProps,
  callback: Function
) {
  //Call the DB

  const sql = `INSERT INTO "portfolios"
  ("name", "description", "currencyId")
  VALUES ('${portfolio.name}', '${portfolio.description}', '${portfolio.currencyId}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);
}

export const getPortfolios = async (callback: Function) => {
  //Call the DB
  console.log("Get all portfolios");
  const sql = `SELECT * FROM portfolios`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};

export const getPortfolioById = async (
  portfolioId: string,
  callback: Function
) => {
  //Call the DB
  console.log("Get portfolio by ID");
  const sql = `SELECT * FROM portfolios WHERE "id" = '${portfolioId}'`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};
