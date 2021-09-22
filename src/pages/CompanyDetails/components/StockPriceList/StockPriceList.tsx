import { Button, message, Popconfirm, Space, Table } from "antd";
import { CompaniesContext } from "contexts/companies";
import moment from "moment";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StockPriceService from "services/stock-prices/stock-prices-service";
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
  const { t } = useTranslation();

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
      title: t("Date"),
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.transactionDate)).format("DD/MM/YYYY")
    },
    {
      title: t("Stock Price"),
      dataIndex: "price",
      key: "price",
      render: (text: string, record: any) => `${text} ${currencySymbol}`
    },
    {
      title: t("Exchange rate"),
      dataIndex: "exchangeRate",
      key: "exchangeRate",
      render: (text: string, record: any) => text
    },
    {
      title: t("Action"),
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`stock-delete-${record.key}`}
            title={t("Delete stock price?")}
            onConfirm={() => confirm(record.key)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button>{t("Delete")}</Button>
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
          content: t("Stock price removed"),
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
          content: t("Unable to remove stock price"),
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
