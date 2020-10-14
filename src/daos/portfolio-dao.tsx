import sendAsync from "../message-control/renderer";

interface PortfolioItemProps {
  name: string;
  description: string;
  currencyId: number;
}

/**
 * Add a new portfolio
 * @param portfolio
 */
export function addPortfolio(portfolio: PortfolioItemProps) {
  //Call the DB

  const sql = `INSERT INTO "portfolios"
  ("name", "description", "currency_id")
  VALUES ('${portfolio.name}', '${portfolio.description}', '${portfolio.currencyId}');`;

  sendAsync(sql).then((result: React.SetStateAction<undefined>) =>
    console.log(result)
  );

  return sql;
}
