import sendIpcSql from "../../message-control/renderer";
import { ShareItemProps } from "../../types/share";
import { deleteById } from "./operations";

export default class ShareDAO {
  addShare = (share: ShareItemProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "shares"
    (
        "sharesNumber"
      , "priceShare"
      , "commission"
      , "type"
      , "exchangeRate"
      , "notes"
      , "operationDate"
      , "companyId"
      , "color"
    )
    VALUES
    (
        '${share.sharesNumber}'
      , '${share.priceShare}'
      , '${share.commission}'
      , '${share.type}'
      , '${share.exchangeRate}'
      , '${share.notes}'
      , '${share.operationDate}'
      , '${share.companyId}'
      , '${share.color}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getShares = (companyId: string) => {
    //Call the DB
    console.log("Get all shares");
    const sql = `
    SELECT
      shares.*
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
    FROM  "shares"
    LEFT JOIN "companies"
      ON companies.id = shares.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE shares.companyId = '${companyId}';
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  getSharesPerYearByCompanyId = (companyId: string) => {
    const sql = `
    SELECT
      strftime('%Y', operationDate) as 'year'
      , companyId
      , sum(CASE WHEN shares.type='BUY' THEN shares.sharesNumber ELSE 0 END) as buySharesCount
      , sum(CASE WHEN shares.type='SELL' THEN shares.sharesNumber ELSE 0 END) as sellSharesCount
      , sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as buyTotal
      , sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END * exchangeRate) as buyTotalBaseCurrency
      , sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as sellTotal
      , sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END * exchangeRate) as sellTotalBaseCurrency
      , sum(CASE WHEN shares.type='BUY' THEN shares.commission ELSE 0 END) as buyCommission
      , sum(CASE WHEN shares.type='SELL' THEN shares.commission ELSE 0 END) as sellCommission
      , count(priceShare) as operationsCount
      FROM  "shares"
      WHERE shares.companyId = '${companyId}'
      GROUP BY strftime('%Y', operationDate)
      ORDER BY strftime('%Y', operationDate)
      ;
      `;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("shares", id);
    return results;
  };
}
