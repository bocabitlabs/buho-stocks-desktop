import sendIpcSql from "../../message-control/renderer";
import { CompanyItemProps } from "../../types/company";
import { deleteById } from "./operations";

export default class CompanyDAO {
  addCompany = (company: CompanyItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "companies"
    ("name", "ticker", "description", "sectorId", "marketId", "currencyId", "portfolioId", "url", "color")
    VALUES ('${company.name}', '${company.ticker}', '${company.description}', '${company.sector}', '${company.market}', '${company.currency}', '${company.portfolio}', '${company.url}', '${company.color}');`;

    const result = sendIpcSql(sql, "insert");
    return result;
  };

  getCompanies = (portfolioId: string) => {
    //Call the DB
    console.log("Get all companies from portfolio");
    const sql = `
    SELECT companies.*
      , sectors.name as sectorName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol
      , S.buySharesNumber
      , S.sellSharesNumber
      , S.buyTotal
      , S.sellTotal
      , S.sellCommission
      , S.buyCommission
      , S.lastTransactionDate
      , portfolios.name as portfolioName

    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    LEFT JOIN "sectors"
      ON sectors.id = companies.sectorId
    LEFT JOIN (SELECT companyId
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.count ELSE 0 END) as buySharesNumber
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.count ELSE 0 END) as sellSharesNumber
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as buyTotal
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as sellTotal
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.commission ELSE 0 END) as buyCommission
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.commission ELSE 0 END) as sellCommission
      , max(transactionDate) as lastTransactionDate
    FROM "sharesTransactions"
      GROUP BY sharesTransactions.companyId) AS S
      ON companies.id = S.companyId
    WHERE companies.portfolioId = '${portfolioId}';
    `;
    console.log(sql)
    const results = sendIpcSql(sql);
    if (results.length > 0 && results[0].id == null) {
      return [];
    }
    return results;
  };
  getCompany = (companyId: string) => {
    //Call the DB
    console.log("Get company");
    const sql = `
    SELECT companies.*
      , portfolios.name as portfolioName
      , currencies.name as currencyName
      , currencies.symbol as currencySymbol

    FROM "companies"
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE companies.id = '${companyId}';
    `;

    const results = sendIpcSql(sql, "get");
    console.log(results);

    return results;
  };

  getAccumulatedShares = (companyId: string, year: string) => {
    console.log(`getAccumulatedSharesDAO`);
    const sql = `
    SELECT
      strftime('%Y', transactionDate) as 'year'
      , companies.id
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.count ELSE 0 END) - sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.count ELSE 0 END) as shares
      FROM  "sharesTransactions", "companies"
      WHERE companies.id='${companyId}' AND sharesTransactions.companyId='${companyId}' AND year <= '${year}'
      ORDER BY strftime('%Y', transactionDate)
      ;`;
    console.log(sql);
    const result = sendIpcSql(sql, "get");
    console.log(result);
    return result;
  };

  getCompaniesFromPortfolio = (portfolioId: string) => {
    const sql = `
    SELECT
      id, name
      FROM  "companies"
      WHERE companies.portfolioId='${portfolioId}'
      ;
    `;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("companies", id);
    return results;
  };
}
