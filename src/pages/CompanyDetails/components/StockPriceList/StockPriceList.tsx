import { Button, message, Popconfirm, Space, Table } from "antd";
import { CompaniesContext } from "contexts/companies";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import StockPriceService from "services/stock-price-service/stock-prices-service";
import { IStockPrice } from "types/stock-price";

interface Props {
  currencySymbol: string;
}

export default function StockPriceList({
  currencySymbol
}: Props): ReactElement | null {
  const { company } = useContext(CompaniesContext);

  const [stockPrices, setStockPrices] = useState<IStockPrice[]>([]);
  const key = "updatable";

  useEffect(() => {
    if (company !== null) {
      const results = StockPriceService.getAll(company.id);
      setStockPrices(results);
    }
  }, [company]);

  if (company == null) {
    return null;
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.transactionDate)).format("DD/MM/YYYY")
    },
    {
      title: "Stock Price",
      dataIndex: "price",
      key: "price",
      render: (text: string, record: any) => `${text} ${currencySymbol}`
    },
    {
      title: "Exchange Rate",
      dataIndex: "exchangeRate",
      key: "exchangeRate",
      render: (text: string, record: any) => text
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`stock-delete-${record.key}`}
            title={`Delete stock price?`}
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

  function confirm(recordId: string) {
    const added = StockPriceService.deleteById(recordId);
    if (added.changes) {
      setTimeout(() => {
        message.success({
          content: "Stock price removed",
          key,
          duration: 2
        });
      }, 1000);
      if (company !== null) {
        const results = StockPriceService.getAll(company.id);
        setStockPrices(results);
      }
    } else {
      setTimeout(() => {
        message.error({
          content: "Unable to remove stock price",
          key,
          duration: 2
        });
      }, 1000);
    }
  }

  const getData = () => {
    const shares2 = stockPrices.map((stock: IStockPrice) => ({
      key: stock.id,
      transactionDate: stock.transactionDate,
      price: stock.price,
      exchangeRate: stock.exchangeRate
    }));

    return shares2;
  };

  return <Table columns={columns} dataSource={getData()} />;
}
