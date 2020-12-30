const getColumns = () => {
  return [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 70
    },
    {
      title: "Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      width: 70
    },
    {
      title: "Accum. Shares",
      dataIndex: "accumulatedSharesNumber",
      key: "accumulatedSharesNumber",
      width: 70
    },
    {
      title: "Invested",
      dataIndex: "investedWithCommission",
      key: "investedWithCommission",
      width: 70
    },
    {
      title: "Accum. Invested",
      dataIndex: "accumulatedInvestmentWithCommission",
      key: "accumulatedInvestmentWithCommission",
      width: 70
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70
    },
    {
      title: "Commission %",
      dataIndex: "commissionPercentage",
      key: "commissionPercentage",
      width: 70
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      width: 70
    },
    {
      title: "Portfolio Value Inf.",
      dataIndex: "portfolioValueWithInflation",
      key: "portfolioValueWithInflation",
      width: 70
    },
    {
      title: "Return",
      dataIndex: "yearReturn",
      key: "yearReturn",
      width: 70
    },
    {
      title: "Accum. Return",
      dataIndex: "accumulatedReturn",
      key: "accumulatedReturn",
      width: 70
    },
    {
      title: "Return + Dividends",
      dataIndex: "returnWithDividends",
      key: "returnWithDividends",
      width: 70
    },
    {
      title: "Gross Dividends",
      dataIndex: "dividendsGross",
      key: "dividendsGross",
      width: 70
    },
    {
      title: "Net Dividends",
      dataIndex: "dividendsNet",
      key: "dividendsNet",
      width: 70
    },
    {
      title: "DPS Gross",
      dataIndex: "dividendsPerShare",
      key: "dividendsPerShare",
      width: 70
    },
    {
      title: "Yearly Return %",
      dataIndex: "yearlyReturnPercentage",
      key: "yearlyReturnPercentage",
      width: 70
    },
    {
      title: "Accum. Return %",
      dataIndex: "accumulatedReturnPercentage",
      key: "accumulatedReturnPercentage",
      width: 70
    },
    {
      title: "Return + Div. %",
      dataIndex: "returnWithDividendPercentage",
      key: "returnWithDividendPercentage",
      width: 70
    },
    {
      title: "RPD",
      dataIndex: "returnPerDividend",
      key: "returnPerDividend",
      width: 70
    },
    {
      title: "Net RPD",
      dataIndex: "returnPerDividendNet",
      key: "returnPerDividendNet",
      width: 70
    },
    {
      title: "YOC",
      dataIndex: "yoc",
      key: "yoc",
      width: 70
    }
  ];
};

export default getColumns;
