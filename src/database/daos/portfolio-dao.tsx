import sendIpcSql from "message-control/renderer";
import { PortfolioYearlyProps } from "types/company";
import { PortfolioItemProps } from "types/portfolio";
import { deleteById, getById } from "./operations";

export default class PortfolioDAO {
  static addPortfolio = (portfolio: PortfolioItemProps) => {
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

  static getYearlySharesDataById = (portfolioId: string): PortfolioYearlyProps[] => {
    console.log("Getting yearly data by company ID");
    const sql = `
    SELECT
      strftime('%Y', transactionDate) as 'year'
      , portfolios.id as portfolioId
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.count ELSE 0 END) as sharesBought
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.count ELSE 0 END) as sharesSold
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as buyTotal
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as sellTotal
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.commission ELSE 0 END) as buyCommission
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.commission ELSE 0 END) as sellCommission
      FROM  "sharesTransactions"
      LEFT JOIN "companies"
        ON companies.id = sharesTransactions.companyId
      LEFT JOIN "portfolios"
        ON companies.portfolioId = portfolios.id
      WHERE portfolios.id = '${portfolioId}'
      GROUP BY strftime('%Y', transactionDate)
      ORDER BY strftime('%Y', transactionDate)
      ;
    `;
    console.log(sql);
    const results = sendIpcSql(sql);
    console.log(results)
    return results;
  };

  static getYearlyDividendsDataById = (portfolioId: string): PortfolioYearlyProps[] => {
    console.log("Getting yearly dividends data by company ID");
    const sql = `
    SELECT
      strftime('%Y', transactionDate) as 'year'
      , portfolios.id as portfolioId
	    , sum(dividendsTransactions.price * dividendsTransactions.count - dividendsTransactions.commission) as dividendsNet
      , sum((dividendsTransactions.price * dividendsTransactions.count - dividendsTransactions.commission) * dividendsTransactions.exchangeRate) as dividendsNetBaseCurrency
      , sum(dividendsTransactions.price * dividendsTransactions.count) as dividendsGross
      , sum(dividendsTransactions.price * dividendsTransactions.count * dividendsTransactions.exchangeRate) as dividendsGrossBaseCurrency
      FROM  "dividendsTransactions"
      LEFT JOIN "companies"
        ON companies.id = dividendsTransactions.companyId
      LEFT JOIN "portfolios"
        ON companies.portfolioId = portfolios.id
      WHERE portfolios.id = '${portfolioId}'
      GROUP BY strftime('%Y', transactionDate)
      ORDER BY strftime('%Y', transactionDate)
      ;
    `;
    console.log(sql);
    const results = sendIpcSql(sql);
    console.log(results)
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("portfolios", id);
    return results;
  };
}
