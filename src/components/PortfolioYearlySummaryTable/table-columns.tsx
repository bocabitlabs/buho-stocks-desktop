
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
  ];
};

export default getColumns;
