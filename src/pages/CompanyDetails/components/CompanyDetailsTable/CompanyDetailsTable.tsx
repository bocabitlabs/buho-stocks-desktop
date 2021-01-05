import { Table } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { columns } from "./table-columns";
import { computeYearlyData } from "./logic/table-logic";
import getTableFooter from "./table-footer";
import { YearlyOperationsFields } from "types/company";
import SharesTransactionsService from "services/shares-transactions-service";
import DividendsTransactionsService from "services/dividends-transactions-service";

interface IProps {
  companyId: string;
}

export default function CompanyDetailsTable({ companyId }: IProps) {
  const [yearlyData, setYearlyData] = useState<YearlyOperationsFields[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const sharesResults = new SharesTransactionsService().getSharesTransactionsPerYearByCompanyId(
      companyId
    );
    const dividendsResults = new DividendsTransactionsService().getDividendsTransactionsPerYearByCompanyId(
      companyId
    );

    const results = computeYearlyData(sharesResults, dividendsResults);
    console.log(results);
    setYearlyData(results);
  }, [setYearlyData, companyId]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getData = () => {
    console.log(yearlyData);
    const parsedYearlyData = yearlyData.map(
      (share: YearlyOperationsFields, index: number) => ({
        id: index.toString(),
        key: index.toString(),
        name: "share",
        // Current year
        year: share.year.toString(),
        // Total number of shares for the current year
        totalShares: share.sharesBought - share.sharesSold,
        // Total number of shares for current + previous years
        accumulatedSharesNumber: share.accumulatedSharesNumber,
        // //  Total amount invested in the current year
        investedAmount: share.investedAmount,
        // // Total amount invested in the current + previous years
        accumulatedInvestment: share.accumulatedInvestment,
        // // Commision
        investmentCommission: share.investmentCommission,
        // // Accumulated Commission
        accumulatedInvestmentCommission: share.accumulatedInvestmentCommission,
        // // Share average price
        averagePrice: share.averagePrice,
        // // Total invested + commission
        ivestmentWithCommission: share.ivestmentWithCommission,
        // // Dividends amount with commissions
        dividendsGross: share.dividendsGross,
        // // Dividends amount without commissions
        dividendsNet: share.dividendsNet,
        // // Dividend Per Share
        dividendsPerShare: share.dividendsPerShare,
        // //  Total amount of dividends for the current + previous years
        accumulatedDividendsGross: share.accumulatedDividendsGross,
        // // Net amount of dividends for the current + previous years
        accumulatedDividendsNet: share.accumulatedDividendsNet,
        // // Values where stock price is required
        latestYearStockPrice: share.latestYearStockPrice,
        portfolioValue: share.portfolioValue,
        portfolioValueWithInflation: share.portfolioValueWithInflation,
        // // Returns
        yearReturn: share.yearReturn,
        accumulatedReturn: share.accumulatedReturn,
        returnPercentage: share.returnPercentage,
        accumulatedReturnPercentage: share.accumulatedReturnPercentage,
        dividendsReturnPercentage: share.dividendsReturnPercentage,
        yoc: share.yoc
        // currencySymbol: share.currencySymbol
      })
    );
    return parsedYearlyData;
  };
  return (
    <Table
      size="small"
      style={{ maxWidth: `max(500px, ${width - 300}px)` }}
      className={"company-table"}
      scroll={{ x: 800 }}
      bordered
      columns={columns}
      dataSource={getData()}
      summary={getTableFooter()}
    />
  );
}
