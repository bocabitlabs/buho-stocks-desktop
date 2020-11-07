import sendSql from "../message-control/renderer";
import { ShareItemProps } from "../types/share";

export function addShare(share: ShareItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "shares"
  ("sharesNumber",
   "priceShare",
     "commission",
      "type",
       "exchangeRate",
        "notes",
         "operationDate",
          "companyId")
  VALUES ('${share.sharesNumber}',
   '${share.priceShare}',
    '${share.commission}',
     '${share.type}',
      '${share.exchangeRate}',
       '${share.notes}',
         '${share.operationDate}',
          '${share.companyId}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export const getShares = async (companyId: string, callback: Function) => {
  //Call the DB
  console.log("Get all shares");
  const sql = `SELECT shares.*, currencies.symbol as currencySymbol, currencies.name as currencyName
  FROM  "shares"
  LEFT JOIN "companies"
  ON companies.id = shares.companyId
  LEFT JOIN "currencies"
  ON currencies.id = companies.currencyId
  WHERE shares.companyId = '${companyId}';`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};
