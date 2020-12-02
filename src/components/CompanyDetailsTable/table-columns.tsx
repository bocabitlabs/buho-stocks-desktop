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
    title: "Accumulated Shares",
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
    title: "Acum. invested",
    dataIndex: "accumulatedInvestment",
    key: "accumulatedInvestment",
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
    title: "Commission",
    dataIndex: "investmentCommission",
    key: "investmentCommission",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Acum. commission",
    dataIndex: "accumulatedInvestmentCommission",
    key: "accumulatedInvestmentCommission",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Total invested with commission",
    dataIndex: "totalInvestedWithCommission",
    key: "totalInvestedWithCommission",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Gross Dividends",
    dataIndex: "dividendsGross",
    key: "dividendsGross",
    width: 70,
    render: (text: string, record: any) => text
  },
  {
    title: "Net Dividends",
    dataIndex: "dividendsNet",
    key: "dividendsNet",
    width: 70,
    render: (text: string, record: any) => text
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