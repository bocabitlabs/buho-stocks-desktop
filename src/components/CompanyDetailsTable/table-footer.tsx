import { Table } from "antd";

interface FooterProps {
  id: string;
  key: string;
  name: string;
  // Current year
  year: string;
  // Total number of shares for the current year
  totalShares: number;
  // Total number of shares for current + previous years
  accumulatedSharesNumber: number;
  //  Total amount invested in the current year
  investedAmount: number;
  // Total amount invested in the current + previous years
  accumulatedInvestment: number;
  // Commision
  investmentCommission: number;
  // Accumulated Commission
  accumulatedInvestmentCommission: number;
  // Share average price
  averagePrice: number;
  // Total invested + commission
  totalInvestedWithCommission: number;
  // Dividends amount with commissions
  dividendsGross: number;
  // Dividends amount without commissions
  dividendsNet: number;
  // Dividend Per Share
  dividendsPerShare: number;
  //  Total amount of dividends for the current + previous years
  accumulatedDividendsGross: number;
  // Net amount of dividends for the current + previous years
  accumulatedDividendsNet: string;
  // Values where stock price is required
  latestYearStockPrice: number;
  portfolioValue: number;
  portfolioValueWithInflation: number;
  // Returns
  yearReturn: string;
  accumulatedReturn: number;
  returnPercentage: number;
  accumulatedReturnPercentage: string;
  dividendsReturnPercentage: string;
  yoc: string;
  rpdEmp: string;
}

export default function getTableFooter(): (
  data: FooterProps[]
) => React.ReactNode {
  return (pageData) => {
    let totalSharesSummary = 0;
    let investedAmountSummary = 0;
    let investmentCommissionSummary = 0;
    let totalInvestedWithCommissionSummary = 0;
    let dividendsGrossSummary = 0;
    let dividendsNetSummary = 0;
    let portfolioValueSummary = 0;
    let portfolioValueWithInflationSummary = 0;
    let accumulatedReturnSummary = 0;

    pageData.forEach(
      ({
        totalShares,
        investedAmount,
        investmentCommission,
        totalInvestedWithCommission,
        dividendsGross,
        dividendsNet,
        portfolioValue,
        portfolioValueWithInflation,
        accumulatedReturn
      }) => {
        totalSharesSummary += totalShares;
        investedAmountSummary += investedAmount;
        investmentCommissionSummary += investmentCommission;
        totalInvestedWithCommissionSummary += totalInvestedWithCommission;
        dividendsGrossSummary += dividendsGross;
        dividendsNetSummary += dividendsNet;
        portfolioValueSummary = portfolioValue;
        portfolioValueWithInflationSummary = portfolioValueWithInflation;
        accumulatedReturnSummary = accumulatedReturn;
      }
    );

    let averagePriceSummary = 0;
    averagePriceSummary = investedAmountSummary / totalSharesSummary;

    let returnPercentageSummary = 0;
    if (investedAmountSummary > 0) {
      returnPercentageSummary =
        ((portfolioValueWithInflationSummary - investedAmountSummary) /
          investedAmountSummary) *
        100;
    }

    let dividendsReturnPercentageSummary = 0;
    if (portfolioValueSummary > 0) {
      dividendsReturnPercentageSummary =
        (dividendsGrossSummary / portfolioValueSummary) * 100;
    }

    let yocSummary = 0;
    if (portfolioValueSummary > 0) {
      yocSummary = (dividendsGrossSummary / investedAmountSummary) * 100;
    }

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
        <Table.Summary.Cell index={2}>{totalSharesSummary}</Table.Summary.Cell>
        <Table.Summary.Cell index={2}></Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          {investedAmountSummary}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={4}></Table.Summary.Cell>
        <Table.Summary.Cell index={4}>{averagePriceSummary}</Table.Summary.Cell>
        <Table.Summary.Cell index={4}>
          {investmentCommissionSummary}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5}></Table.Summary.Cell>
        <Table.Summary.Cell index={6}>
          {totalInvestedWithCommissionSummary}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={7}>
          {dividendsGrossSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={8}>
          {dividendsNetSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={9}></Table.Summary.Cell>
        <Table.Summary.Cell index={10}></Table.Summary.Cell>
        <Table.Summary.Cell index={11}></Table.Summary.Cell>
        <Table.Summary.Cell index={12}></Table.Summary.Cell>
        <Table.Summary.Cell index={13}>
          {portfolioValueSummary}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={13}>
          {portfolioValueWithInflationSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={14}></Table.Summary.Cell>
        <Table.Summary.Cell index={15}>
          {accumulatedReturnSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={16}></Table.Summary.Cell>
        <Table.Summary.Cell index={17}>
          {returnPercentageSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={18}>
          {dividendsReturnPercentageSummary.toFixed(2)}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={19}>
          {yocSummary.toFixed(2)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
}
