import { Table } from "antd";
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import PortfolioService from "services/portfolio-service";
import { PortfolioYearlyProps } from "types/company";
import { computeYearlyData } from "./logic/table-logic";
import getColumns from "./table-columns";

interface Props {
  portfolioId: string;
}

export default function PortfolioYearlySummaryTable({
  portfolioId
}: Props): ReactElement {
  const [width, setWidth] = useState(window.innerWidth);
  const [yearlyData, setYearlyData] = useState<PortfolioYearlyProps[]>([]);

  useEffect(() => {
    const yearlyPortfolioSharesData = new PortfolioService().getYearlySharesData(
      portfolioId
    );
    const yearlyPortfolioDividendsData = new PortfolioService().getYearlyDividendsData(
      portfolioId
    );

    const results = computeYearlyData(
      yearlyPortfolioSharesData,
      yearlyPortfolioDividendsData
    );
    console.log(results);
    setYearlyData(results);
  }, [setYearlyData, portfolioId]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getData = () => {
    const columnData = yearlyData.map((yearData: PortfolioYearlyProps) => ({
      id: yearData.id,
      key: yearData.id,
      year: yearData.year,
      sharesNumber: yearData.sharesNumber,
      commission: yearData.commission,
      commissionPercentage: yearData.commissionPercentage,
      investedWithCommission: yearData.investedWithCommission,
      accumulatedSharesNumber: yearData.accumulatedSharesNumber,
      accumulatedInvestmentWithCommission:
        yearData.accumulatedInvestmentWithCommission,
      portfolioValue: yearData.portfolioValue,
      portfolioValueWithInflation: yearData.portfolioValueWithInflation,
      yearReturn: yearData.yearReturn,
      accumulatedReturn: yearData.accumulatedReturn,
      dividendsGross: yearData.dividendsGross,
      dividendsNet: yearData.dividendsNet,
      returnWithDividends: yearData.returnWithDividends,
      dividendsPerShare: yearData.dividendsPerShare,
      yearlyReturnPercentage: yearData.yearlyReturnPercentage,
      accumulatedReturnPercentage: yearData.accumulatedReturnPercentage,
      returnWithDividendPercentage: yearData.returnWithDividendPercentage,
      returnPerDividend: yearData.returnPerDividend,
      returnPerDividendNet: yearData.returnPerDividendNet,
      yoc: yearData.yoc
    }));
    return columnData;
  };
  return (
    <Table
      size="small"
      style={{ maxWidth: `max(500px, ${width - 300}px)` }}
      className={"company-table"}
      scroll={{ x: 800 }}
      bordered
      columns={getColumns()}
      dataSource={getData()}
    />
  );
}
