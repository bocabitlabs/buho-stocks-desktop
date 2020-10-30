import {
  addPortfoliosMessageReply,
  getPortfolioDetailsMessageReply,
  getPortfoliosMessageReply
} from "../message-control/messages";
import sendSqlWithCallback from "./send-sql";

interface PortfolioItemProps {
  name: string;
  description: string;
  currencyId: number;
}

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

  sendSqlWithCallback(
    sql,
    addPortfoliosMessageReply,
    callback,
    (error: string) => console.log(error)
  );
}

export const getPortfolios = async (callback: Function) => {
  //Call the DB
  console.log("Get all portfolios");
  const sql = `SELECT * FROM portfolios`;
  sendSqlWithCallback(
    sql,
    getPortfoliosMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};

export const getPortfolioById = async (
  portfolioId: string,
  callback: Function
) => {
  //Call the DB
  console.log("Get portfolio by ID");
  const sql = `SELECT * FROM portfolios WHERE "id" = '${portfolioId}'`;
  sendSqlWithCallback(
    sql,
    getPortfolioDetailsMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};
