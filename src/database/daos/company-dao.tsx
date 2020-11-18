import sendIpcSql from "../../message-control/renderer";
import { CompanyItemProps } from "../../types/company";

export default class CompanyDAO {
  addCompany = (company: CompanyItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "companies"
    ("name", "ticker", "description", "sectorId", "marketId", "currencyId", "portfolioId", "url", "color")
    VALUES ('${company.name}', '${company.ticker}', '${company.description}', '${company.sector}', '${company.market}', '${company.currency}', '${company.portfolio}', '${company.url}', '${company.color}');`;

    const result = sendIpcSql(sql, "insert");
    console.log(result);

    return result;
  };

  getCompanies = (portfolioId: string) => {
    //Call the DB
    console.log("Get all companies from portfolio");
    const sql = `SELECT companies.*
    ,sectors.name as sectorName
    , currencies.name as currencyName
    ,currencies.symbol as currencySymbol
    , S.buySharesNumber
    , S.sellSharesNumber
    , S.buyTotal
    , S.sellTotal
    , S.sellCommission
    , S.buyCommission
    ,portfolios.name as portfolioName

        FROM "companies"
       LEFT JOIN "portfolios"
       ON portfolios.id = companies.portfolioId
        LEFT JOIN "currencies"
        ON currencies.id = companies.currencyId
        LEFT JOIN "sectors"
        ON sectors.id = companies.sectorId
        LEFT JOIN (SELECT companyId
                , sum(CASE WHEN shares.type='BUY' THEN shares.sharesNumber ELSE 0 END) as buySharesNumber
                ,sum(CASE WHEN shares.type='SELL' THEN shares.sharesNumber ELSE 0 END) as sellSharesNumber
                ,sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as buyTotal
                ,sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as sellTotal
                ,sum(CASE WHEN shares.type='BUY' THEN shares.commission ELSE 0 END) as buyCommission
                ,sum(CASE WHEN shares.type='SELL' THEN shares.commission ELSE 0 END) as sellCommission
              FROM "shares"
              GROUP BY shares.companyId) AS S
              ON companies.id = S.companyId
    WHERE companies.portfolioId = '${portfolioId}';`;
    const results = sendIpcSql(sql);
    console.log(results);
    console.log(results.length);
    if (results.length > 0 && results[0].id == null) {
      console.log("return empty");
      return [];
    }
    return results;
  };
  getCompany = (companyId: string) => {
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

    return results;
  };

  deleteCompanyById = (companyId: string) => {
    //Call the DB
    console.log("Delete company by ID");
    const sql = `DELETE FROM companies WHERE "id" = '${companyId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}
