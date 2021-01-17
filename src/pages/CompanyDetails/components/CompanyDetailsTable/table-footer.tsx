import { Table } from "antd";
import { DividendUtils } from "utils/dividend-utils";
import Text from "antd/lib/typography/Text";

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
  // //  Total amount invested in the current year
  investedAmount: number;
  // // Total amount invested in the current + previous years
  accumulatedInvestment: number;
  // // Commision
  investmentCommission: number;
  // // Accumulated Commission
  accumulatedInvestmentCommission: number;
  // // Share average price
  averagePrice: number;
  // // Total invested + commission
  ivestmentWithCommission: number;
  // // Dividends amount with commissions
  dividendsGross: number;
  // // Dividends amount without commissions
  dividendsNet: number;
  // // Dividend Per Share
  dividendsPerShare: number;
  // //  Total amount of dividends for the current + previous years
  accumulatedDividendsGross: number;
  // // Net amount of dividends for the current + previous years
  accumulatedDividendsNet: number;
  // // Values where stock price is required
  latestYearStockPrice: number;
  portfolioValue: number;
  portfolioValueWithInflation: number;
  // // Returns
  yearReturn: number;
  accumulatedReturn: number;
  returnPercentage: number;
  accumulatedReturnPercentage: number;
  dividendsReturnPercentage: number;
  yoc: number;
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
    let portfolioValueInflationSummary = 0;
    let accumulatedReturnSummary = 0;

    pageData.forEach(
      ({
        totalShares,
        investedAmount,
        investmentCommission,
        ivestmentWithCommission,
        dividendsGross,
        dividendsNet,
        portfolioValue,
        portfolioValueWithInflation,
        accumulatedReturn
      }) => {
        totalSharesSummary += totalShares;
        investedAmountSummary += investedAmount;
        investmentCommissionSummary += investmentCommission;
        totalInvestedWithCommissionSummary += ivestmentWithCommission;
        dividendsGrossSummary += dividendsGross;
        dividendsNetSummary += dividendsNet;
        portfolioValueSummary = portfolioValue;
        portfolioValueInflationSummary = portfolioValueWithInflation;
        accumulatedReturnSummary = accumulatedReturn;
      }
    );

    let averagePriceSummary = 0;
    averagePriceSummary = investedAmountSummary / totalSharesSummary;

    let returnPercentageSummary = 0;
    if (investedAmountSummary > 0) {
      returnPercentageSummary =
        ((portfolioValueInflationSummary - investedAmountSummary) /
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
        <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
        <Table.Summary.Cell index={1}>{totalSharesSummary}</Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          {DividendUtils.getAmountWithSymbol(
            investedAmountSummary.toFixed(2).toString(),
            // record.currencySymbol
            "$"
          )}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5}>
          {DividendUtils.getAmountWithSymbol(
            investmentCommissionSummary.toFixed(2).toString(),
            // record.currencySymbol
            "$"
          )}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={8}>
          {DividendUtils.getAmountWithSymbol(
            averagePriceSummary.toFixed(2).toString(),
            // record.currencySymbol
            "$"
          )}
        </Table.Summary.Cell>

        <Table.Summary.Cell index={9}>
          <Text>
            {DividendUtils.getAmountWithSymbol(
              dividendsGrossSummary.toFixed(2).toString(),
              // record.currencySymbol
              "$"
            )}
          </Text>
          <br />
          <Text type="secondary">
            {DividendUtils.getAmountWithSymbol(
              dividendsNetSummary.toFixed(2).toString(),
              // record.currencySymbol
              "$"
            )}
          </Text>
        </Table.Summary.Cell>

        <Table.Summary.Cell index={14}></Table.Summary.Cell>
        <Table.Summary.Cell index={15}>
          <Text>
            {DividendUtils.getAmountWithSymbol(
              portfolioValueSummary.toFixed(2).toString(),
              // record.currencySymbol
              "$"
            )}
          </Text>
          <br />
          <Text type="secondary">
            {DividendUtils.getAmountWithSymbol(
              portfolioValueInflationSummary.toFixed(2).toString(),
              // record.currencySymbol
              "$"
            )}
          </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={17}>
        <Text>
          {DividendUtils.getAmountWithSymbol(
            accumulatedReturnSummary.toFixed(2).toString(),
            // record.currencySymbol
            "$"
          )}
          </Text>
          <br/>
          <Text type="secondary">
          {DividendUtils.getAmountWithSymbol(
            returnPercentageSummary.toFixed(2).toString(),
            // record.currencySymbol
            "%"
          )}
          </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={14}></Table.Summary.Cell>

        <Table.Summary.Cell index={21}>
          {DividendUtils.getAmountWithSymbol(
            dividendsReturnPercentageSummary.toFixed(2).toString(),
            // record.currencySymbol
            "%"
          )}
        </Table.Summary.Cell>
        <Table.Summary.Cell index={22}>
          {DividendUtils.getAmountWithSymbol(
            yocSummary.toFixed(2).toString(),
            // record.currencySymbol
            "%"
          )}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
}
