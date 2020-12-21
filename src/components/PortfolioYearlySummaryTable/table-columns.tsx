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
    }
  ];
};

export default getColumns;
