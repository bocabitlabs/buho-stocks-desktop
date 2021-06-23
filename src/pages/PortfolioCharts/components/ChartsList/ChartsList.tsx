import { PortfoliosContext } from "contexts/portfolios";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import PortfolioService from "services/portfolios/portfolios-service";
import Charts from "./Charts/Charts";

export default function ChartsList(): ReactElement | null {
  const { portfolio } = useContext(PortfoliosContext);
  const [year, setYear] = useState("all");
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    if (portfolio !== null) {
      const currentDate = moment().format("YYYY");
      const firstTransaction = PortfolioService.getFirstTransaction(
        portfolio.id
      );
      const firstDate = moment(firstTransaction.transactionDate).format("YYYY");
      let newYears = [];
      for (let index = +currentDate; index >= +firstDate; index--) {
        newYears.push(index);
      }
      setYears(newYears);
    }
  }, [portfolio]);

  if (portfolio === null) {
    return null;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <Charts portfolio={portfolio} year={year} years={years} />
    </div>
  );
}