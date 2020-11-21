import { Button, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CurrenciesContext } from "../../contexts/currencies";
import CurrencyService from "../../services/currency-service";
import { CurrencyItemProps } from "../../types/currency";

export default function CurrencyListTable() {
  const { currencies } = useContext(CurrenciesContext);
  const history = useHistory();

  function confirm(recordId: string) {
    const result = new CurrencyService().deleteById(recordId);
    if (result === "OK") {
      history.push({
        pathname: "/currencies",
        state: {
          message: { type: "success", text: "Currency has been deleted" }
        }
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
