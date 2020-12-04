import { Table } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DividendService from "../../services/dividend-service";
import ShareService from "../../services/share-service";
import { YearlyOperationsFields } from "../../types/company";
import { columns } from "./table-columns";
import { computeYearlyData } from "./logic/table-logic";
import { DividendUtils } from "../../utils/dividend-utils";

interface IProps {
  companyId: string;
}

export default function CompanyDetailsTable({ companyId }: IProps) {
  const [yearlyData, setYearlyData] = useState<YearlyOperationsFields[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const sharesResults = new ShareService().getSharesPerYearByCompanyId(
      companyId
    );
    const dividendsResults = new DividendService().getDividendsPerYearByCompanyId(
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
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getData = () => {
    const dividentUtils = new DividendUtils();

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
        //  Total amount invested in the current year
        investedAmount: share.investedAmount,
        // Total amount invested in the current + previous years
        accumulatedInvestment: share.accumulatedInvestment,
        // Commision
        investmentCommission: share.investmentCommission,
        // Accumulated Commission
        accumulatedInvestmentCommission: share.accumulatedInvestmentCommission,
        // Share average price
        averagePrice: share.averagePrice,
        // Total invested + commission
        totalInvestedWithCommission: share.totalInvestedWithCommission,
        // Dividends amount with commissions
        dividendsGross: share.dividendsGross.toFixed(2),
        // Dividends amount without commissions
        dividendsNet: share.dividendsNet.toFixed(2),
        // Dividend Per Share
        dividendsPerShare: share.dividendsPerShare,
        //  Total amount of dividends for the current + previous years
        accumulatedDividendsGross: share.accumulatedDividendsGross,
        // Net amount of dividends for the current + previous years
        accumulatedDividendsNet: share.accumulatedDividendsNet.toFixed(2),
        // Values where stock price is required
        latestYearStockPrice: share.latestYearStockPrice,
        portfolioValue: share.portfolioValue.toFixed(2),
        portfolioValueInflation: share.portfolioValueInflation.toFixed(2),
        // Returns
        yearReturn: share.yearReturn.toFixed(2),
        accumulatedReturn: share.accumulatedReturn.toFixed(2),
        returnPercentage: dividentUtils.getPercentage(share.returnPercentage.toFixed(2)),
        accumulatedReturnPercentage: dividentUtils.getPercentage(share.accumulatedReturnPercentage.toFixed(2)),
        dividendsReturnPercentage: dividentUtils.getPercentage(share.dividendsReturnPercentage.toFixed(2)),
        yoc: dividentUtils.getPercentage(share.yoc.toFixed(2)),
        rpdEmp: dividentUtils.getPercentage(share.rpdEmp.toFixed(2)),
      })
    );
    return parsedYearlyData;
  };
  console.log(width);
  return (
    <div>
      <>
        <Table
          size="small"
          style={{ maxWidth: `max(500px, ${width-300}px)` }}
          scroll={{ x: 800 }}
          bordered
          columns={columns}
          dataSource={getData()}
        />
      </>
    </div>
  );
}
