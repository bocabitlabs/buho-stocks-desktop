import sendIpcSql from "../../message-control/renderer";
import { PortfolioYearlyProps } from "../../types/company";
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

  getYearlySharesDataById = (portfolioId: string): PortfolioYearlyProps[] => {
    console.log("Getting yearly data by company ID");
    const sql = `
    SELECT
      strftime('%Y', operationDate) as 'year'
      , portfolios.id as portfolioId
      , sum(CASE WHEN shares.type='BUY' THEN shares.sharesNumber ELSE 0 END) as sharesBought
      , sum(CASE WHEN shares.type='SELL' THEN shares.sharesNumber ELSE 0 END) as sharesSold
      , sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as buyTotal
      , sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as sellTotal
      , sum(CASE WHEN shares.type='BUY' THEN shares.commission ELSE 0 END) as buyCommission
      , sum(CASE WHEN shares.type='SELL' THEN shares.commission ELSE 0 END) as sellCommission
      FROM  "shares"
      LEFT JOIN "companies"
        ON companies.id = shares.companyId
      LEFT JOIN "portfolios"
        ON companies.portfolioId = portfolios.id
      WHERE portfolios.id = '${portfolioId}'
      GROUP BY strftime('%Y', operationDate)
      ORDER BY strftime('%Y', operationDate)
      ;
    `;
    console.log(sql);
    const results = sendIpcSql(sql);
    console.log(results)
    return results;
  };

  getYearlyDividendsDataById = (portfolioId: string): PortfolioYearlyProps[] => {
    console.log("Getting yearly dividends data by company ID");
    const sql = `
    SELECT
      strftime('%Y', operationDate) as 'year'
      , portfolios.id as portfolioId
	    , sum(dividends.priceShare * dividends.sharesNumber - dividends.commission) as dividendsNet
      , sum((dividends.priceShare * dividends.sharesNumber - dividends.commission) * dividends.exchangeRate) as dividendsNetBaseCurrency
      , sum(dividends.priceShare * dividends.sharesNumber) as dividendsGross
      , sum(dividends.priceShare * dividends.sharesNumber * dividends.exchangeRate) as dividendsGrossBaseCurrency
      FROM  "dividends"
      LEFT JOIN "companies"
        ON companies.id = dividends.companyId
      LEFT JOIN "portfolios"
        ON companies.portfolioId = portfolios.id
      WHERE portfolios.id = '${portfolioId}'
      GROUP BY strftime('%Y', operationDate)
      ORDER BY strftime('%Y', operationDate)
      ;
    `;
    console.log(sql);
    const results = sendIpcSql(sql);
    console.log(results)
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("portfolios", id);
    return results;
  };
}
