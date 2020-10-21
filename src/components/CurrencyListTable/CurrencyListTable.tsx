import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrencies } from "../../daos/currency-dao";
import { CurrencyItemProps } from "../../types/currency";

export default function CurrencyListTable() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Abbreviation",
      dataIndex: "abbreviation",
      key: "abbreviation"
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol"
    },
    {
      title: "Region",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: { name: string }) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const getData = () => {
    return currencies.map((currency: CurrencyItemProps) => ({
      key: currency.id,
      name: currency.name,
      abbreviation:  currency.abbreviation,
      symbol: currency.symbol,
      country: currency.country
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
