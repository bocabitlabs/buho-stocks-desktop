import { DividendUtils } from "../../utils/dividend-utils";

const dividentUtils = new DividendUtils();

export const columns = [
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    width: 70,
    fixed: "left" as "left", // cast fixed
    render: (text: string, record: any) => text
  },
  {
    title: "Number of Shares",
    dataIndex: "totalShares",
    key: "totalShares",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Accum. Shares",
    dataIndex: "accumulatedSharesNumber",
    key: "accumulatedSharesNumber",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Total invested",
    dataIndex: "investedAmount",
    key: "investedAmount",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Acum. investment",
    dataIndex: "accumulatedInvestment",
    key: "accumulatedInvestment",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Commission",
    dataIndex: "investmentCommission",
    key: "investmentCommission",
    width: 70,
    render(text: string, record: any) {
      return {
        props: {
          style: { background: "#fff1f0" },
        },
        children: text,
      };
    },
  },
  {
    title: "Acum. commission",
    dataIndex: "accumulatedInvestmentCommission",
    key: "accumulatedInvestmentCommission",
    width: 70,
    render(text: string, record: any) {
      return {
        props: {
          style: { background: "#fff1f0" },
        },
        children: text,
      };
    },
  },
  {
    title: "Total invested with commission",
    dataIndex: "ivestmentWithCommission",
    key: "ivestmentWithCommission",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Average price",
    dataIndex: "averagePrice",
    key: "averagePrice",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Gross Dividends",
    dataIndex: "dividendsGross",
    key: "dividendsGross",
    width: 70,
    render: (text: number, record: any) => text===0?text.toFixed(2):"0"
  },
  {
    title: "Net Dividends",
    dataIndex: "dividendsNet",
    key: "dividendsNet",
    width: 70,
    render: (text: number, record: any) => text===0?text.toFixed(2):"0"
  },
  {
    title: "DPS",
    dataIndex: "dividendsPerShare",
    key: "dividendsPerShare",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Gross accumulated dividends",
    dataIndex: "accumulatedDividendsGross",
    key: "accumulatedDividendsGross",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Net accumulated dividends",
    dataIndex: "accumulatedDividendsNet",
    key: "accumulatedDividendsNet",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Stock price",
    dataIndex: "latestYearStockPrice",
    key: "latestYearStockPrice",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Portfolio Value",
    dataIndex: "portfolioValue",
    key: "portfolioValue",
    width: 70,
    render: (text: number, record: any) => text===0?"0":text.toFixed(2)
  },
  {
    title: "Portfolio Value Inf.",
    dataIndex: "portfolioValueWithInflation",
    key: "portfolioValueWithInflation",
    width: 70,
    render: (text: number, record: any) => text===0?"0":text.toFixed(2)
  },
  {
    title: "Return",
    dataIndex: "yearReturn",
    key: "yearReturn",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Acum. Return",
    dataIndex: "accumulatedReturn",
    key: "accumulatedReturn",
    width: 70,
    render: (text: number, record: any) => text===0?"0":text.toFixed(2)
  },
  {
    title: "Return %",
    dataIndex: "returnPercentage",
    key: "returnPercentage",
    width: 70,
    render: (text: number, record: any) =>
      dividentUtils.getPercentage(text===0?"0":text.toFixed(2))
  },
  {
    title: "Accum. Return %",
    dataIndex: "accumulatedReturnPercentage",
    key: "accumulatedReturnPercentage",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Dividend Return %",
    dataIndex: "dividendsReturnPercentage",
    key: "dividendsReturnPercentage",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "YOC",
    dataIndex: "yoc",
    key: "yoc",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "RPD Emp",
    dataIndex: "rpdEmp",
    key: "rpdEmp",
    width: 70,
    render: (text: string, record: any) => text
  }
  // {
  //   title: "Total invested in base currency",
  //   dataIndex: "totalInvestedBaseCurrency",
  //   key: "totalInvestedBaseCurrency",
  //   width: 70,
  //   render: (text: string, record: any) => text
  // }
];
