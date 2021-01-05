import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { CurrenciesContext } from "contexts/currencies";
import CurrencyService from "services/currency-service";
import { Currency } from "types/currency";

export default function CurrencyListTable() {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);
  const key = "updatable";

  function confirm(recordId: string) {
    const result = new CurrencyService().deleteById(recordId);
    if (result.changes) {
      fetchCurrencies();
      message.success({
        content: "Currency has been deleted",
        key,
        duration: 2
      });
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text
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
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`currency-delete-${record.key}`}
            title={`Delete currency ${record.name}?`}
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

  const getData = () => {
    return currencies.map((currency: Currency) => ({
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
