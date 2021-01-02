import { Button, Popconfirm, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  portfolioId: string;
  confirm: Function;
}

const getColumns = ({ portfolioId, confirm }: Props) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 70,

      render: (text: string, record: any) => {
        return (
        <Link to={`/portfolios/${portfolioId}/companies/${record.id}`}>
          {text}
        </Link>
      )}
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      width: 70
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      width: 70
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 70
    },
    {
      title: "Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      width: 70
    },
    {
      title: "Total inv.",
      dataIndex: "investedAmount",
      key: "investedAmount",
      width: 70
    },
    {
      title: "Total Commission",
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
      title: "Average Price",
      dataIndex: "averagePrice",
      key: "averagePrice",
      width: 70
    },
    {
      title: "Avg price w/o commission",
      dataIndex: "averagePriceWithoutCommission",
      key: "averagePriceWithoutCommission",
      width: 70
    },
    {
      title: "Stock Price",
      dataIndex: "lastStockPrice",
      key: "lastStockPrice",
      width: 70
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      width: 70
    },
    {
      title: "Portfolio Value w Infl",
      dataIndex: "portfolioValueWithInflation",
      key: "portfolioValueWithInflation",
      width: 70
    },
    {
      title: "Accum. Return",
      dataIndex: "accumReturn",
      key: "accumReturn",
      width: 70
    },
    {
      title: "Accum. Return %",
      dataIndex: "accumReturnPercentage",
      key: "accumReturnPercentage",
      width: 70
    },
    {
      title: "Accum. Dividends G.",
      dataIndex: "accumulatedDividendsGross",
      key: "accumulatedDividendsGross",
      width: 70
    },
    {
      title: "Accum. Dividends Net.",
      dataIndex: "accumulatedDividendsNet",
      key: "accumulatedDividendsNet",
      width: 70
    },
    {
      title: "Return + Div.",
      dataIndex: "returnWithDividends",
      key: "returnWithDividends",
      width: 70
    },
    {
      title: "Return + Div. %",
      dataIndex: "returnWithDividendsPercentage",
      key: "returnWithDividendsPercentage",
      width: 70
    },
    {
      title: "RPD",
      dataIndex: "rpd",
      key: "rpd",
      width: 70
    },
    {
      title: "YOC",
      dataIndex: "yoc",
      key: "yoc",
      width: 70
    },
    {
      title: "Action",
      key: "action",
      width: 70,

      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`company-delete-${record.key}`}
            title={`Delete company ${record.name} and all it's contents?`}
            onConfirm={() => confirm(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
};

export default getColumns;
