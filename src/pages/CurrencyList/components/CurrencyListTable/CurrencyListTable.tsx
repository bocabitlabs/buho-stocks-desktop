import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { CurrenciesContext } from "contexts/currencies";
import { ICurrency } from "types/currency";
import { Link } from "react-router-dom";
import CountryFlag from "components/CountryFlag/CountryFlag";

export default function CurrencyListTable() {
  const { currencies, getAll: getAllCurrencies, deleteById: deleteCurrencyById } = useContext(CurrenciesContext);
  const key = "updatable";

  function confirm(recordId: string) {
    const result = deleteCurrencyById(recordId);
    if (result.changes) {
      getAllCurrencies();
      message.success({
        content: "Currency has been deleted",
        key,
        duration: 2
      });
    }
  }

  const columns: any = [
    {
      title: "",
      dataIndex: "color",
      key: "color",
      render: (text: string) => (
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="10" fill={text} />
        </svg>
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <Link to={`/currencies/${record.id}/edit`}>{text}</Link>,
      sorter: (a: ICurrency, b: ICurrency) => a.name.localeCompare(b.name),
    },
    {
      title: "Abbreviation",
      dataIndex: "abbreviation",
      key: "abbreviation",
      sorter: (a: ICurrency, b: ICurrency) => a.abbreviation.localeCompare(b.abbreviation),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      sorter: (a: ICurrency, b: ICurrency) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: "Region",
      dataIndex: "country",
      key: "country",
      render: (text: string, record: any) => (<CountryFlag code={text}/>),
      sorter: (a: ICurrency, b: ICurrency) => a.country.localeCompare(b.country)
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
            <Button danger type="text">Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const getData = () => {
    return currencies.map((currency: ICurrency) => ({
      id: currency.id,
      key: currency.id,
      color: currency.color,
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
