import { Space, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { CurrenciesContext } from "../../contexts/currencies";
import { CurrencyItemProps } from "../../types/currency";

export default function CurrencyListTable() {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

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
      abbreviation: currency.abbreviation,
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
