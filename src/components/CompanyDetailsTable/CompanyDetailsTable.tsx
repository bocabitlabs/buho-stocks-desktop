import { Table } from "antd";
import React, { useEffect, useState } from "react";
import DividendService from "../../services/dividend-service";
import ShareService from "../../services/share-service";
import { YearlyOperationsFields } from "../../types/company";
import { DividendUtils } from "../../utils/dividend-utils";
import { columns } from "./table-columns";
import { computeYearlyData } from "./logic/table-logic";

interface IProps {
  companyId: string;
}

export default function CompanyDetailsTable({ companyId }: IProps) {
  const [yearlyData, setYearlyData] = useState<YearlyOperationsFields[]>([]);

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
        dividendsGross: share.dividendsGross,
        // Dividends amount without commissions
        dividendsNet: share.dividendsNet,
        // Dividend Per Share
        dividendsPerShare: share.dividendsPerShare,
        //  Total amount of dividends for the current + previous years
        accumulatedDividendsGross: share.accumulatedDividendsGross,
        // Net amount of dividends for the current + previous years
        accumulatedDividendsNet: share.accumulatedDividendsNet
      })
    );
    return parsedYearlyData;
  };

  return (
    <div>
      <>
        <Table
          size="small"
          style={{ maxWidth: "max(500px, 76vw)" }}
          scroll={{ x: 800 }}
          bordered
          columns={columns}
          dataSource={getData()}
        />
      </>
    </div>
  );
}
