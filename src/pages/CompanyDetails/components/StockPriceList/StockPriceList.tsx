import { Button, message, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import StockPriceService from "services/stock-price-service";
import { StockPriceFields } from "types/stock-price";

interface Props {
  companyId: string;
  currencySymbol: string;
}

export default function StockPriceList({
  companyId,
  currencySymbol
}: Props): ReactElement {
  const [stockPrices, setStockPrices] = useState<StockPriceFields[]>([]);
  const key = "updatable";

  useEffect(() => {
    const results = new StockPriceService().getStockPrices(companyId);
    setStockPrices(results);
  }, [companyId]);

  const columns = [
    {
      title: "Date",
      dataIndex: "operationDate",
      key: "operationDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.operationDate)).format("DD/MM/YYYY")
    },
    {
      title: "Stock Price",
      dataIndex: "priceShare",
      key: "priceShare",
      render: (text: string, record: any) => `${text} ${currencySymbol}`
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
    const added = new StockPriceService().deleteById(recordId);
    if (added.changes) {
      setTimeout(() => {
        message.success({
          content: "Stock price removed",
          key,
          duration: 2
        });
      }, 1000);
      const results = new StockPriceService().getStockPrices(companyId);
      setStockPrices(results);
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
    const shares2 = stockPrices.map((stock: StockPriceFields) => ({
      key: stock.id,
      operationDate: stock.operationDate,
      priceShare: stock.priceShare
    }));

    return shares2;
  };

  return <Table columns={columns} dataSource={getData()} />;
}
