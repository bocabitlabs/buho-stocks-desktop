import sendIpcSql from "../../message-control/renderer";
import { CompanyItemProps } from "../../types/company";

export default class CompanyDAO {
  addCompany = (company: CompanyItemProps, callback: Function) => {
    //Call the DB
    const sql = `INSERT INTO "companies"
    ("name", "ticker", "description", "sectorId", "marketId", "currencyId", "portfolioId", "url")
    VALUES ('${company.name}', '${company.ticker}', '${company.description}', '${company.sector}', '${company.market}', '${company.currency}', '${company.portfolio}', '${company.url}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);

    return sql;
  };

  getCompanies = (portfolioId: string, callback: Function) => {
    //Call the DB
    console.log("Get all companies");
    const sql = `SELECT companies.*, sectors.id as sectorId, sectors.name as sectorName, currencies.name as currency, currencies.id as currencyId,
    sum(CASE WHEN shares.type='BUY' THEN shares.sharesNumber ELSE 0 END) as buySharesNumber,
    sum(CASE WHEN shares.type='SELL' THEN shares.sharesNumber ELSE 0 END) as sellSharesNumber,
    sum(CASE WHEN shares.type='BUY' THEN shares.commission ELSE 0 END) as buyCommission,
    sum(CASE WHEN shares.type='SELL' THEN shares.commission ELSE 0 END) as sellCommission,
    sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as buyTotal,
    sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as sellTotal,
    portfolios.name as portfolioName,
    currencies.name as currencyName,
    currencies.symbol as currencySymbol
    FROM "companies"
    LEFT JOIN "portfolios"
    ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
    ON currencies.id = companies.currencyId
      LEFT JOIN "sectors"
    ON sectors.id = companies.sectorId
    LEFT JOIN "shares"
    ON companies.id = shares.companyId
    WHERE companies.portfolioId = '${portfolioId}';`;
    const results = sendIpcSql(sql);
    console.log(results);

    callback(results);
  };
  getCompany = (companyId: string, callback: Function) => {
    //Call the DB
    console.log("Get company");
    const sql = `SELECT companies.*,
     portfolios.name as portfolioName,
     currencies.name as currencyName,
     currencies.symbol as currencySymbol
    FROM "companies"
    LEFT JOIN "portfolios"
    ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE companies.id = '${companyId}';`;
    const results = sendIpcSql(sql, "get");
    console.log(results);

    callback(results);
  };
}
