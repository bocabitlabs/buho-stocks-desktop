import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { MarketsContext } from "contexts/markets";
import { IMarket } from "types/market";
import { Link } from "react-router-dom";
import CountryFlag from "components/CountryFlag/CountryFlag";
import { useTranslation } from "react-i18next";

export default function MarketListTable() {
  const { markets, getAll: fetchMarkets, deleteById: deleteMarketById } = useContext(MarketsContext);
  const key = "updatable";
  const { t } = useTranslation();

  function confirm(recordId: string) {
    const result = deleteMarketById(recordId);
    if (result.changes) {
      fetchMarkets();
      message.success({
        content: t("Market has been deleted"),
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
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <Link to={`/markets/${record.id}/edit`}>{text}</Link>,
      sorter: (a: IMarket, b: IMarket) => a.name.localeCompare(b.name)
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      sorter: (a: IMarket, b: IMarket) => a.description.localeCompare(b.description)
    },
    {
      title: t("Region"),
      dataIndex: "region",
      key: "region",
      render: (text: string, record: any) => (<CountryFlag code={text}/>),
      sorter: (a: IMarket, b: IMarket) => a.region.localeCompare(b.region)
    },
    {
      title: t("Opening time"),
      dataIndex: "openTime",
      key: "openTime",
      sorter: (a: IMarket, b: IMarket) => a.openTime.localeCompare(b.openTime)
    },
    {
      title: t("Closing time"),
      dataIndex: "closeTime",
      key: "closeTime",
      sorter: (a: IMarket, b: IMarket) => a.closeTime.localeCompare(b.closeTime)
    },
    {
      title: t("Action"),
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`market-delete-${record.key}`}
            title={`Delete market ${record.name}?`}
            onConfirm={() => confirm(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const getData = () => {
    return markets.map((market: IMarket) => ({
      id: market.id,
      key: market.id,
      name: market.name,
      description: market.description,
      region: market.region,
      openTime: market.openTime,
      closeTime: market.closeTime,
      color: market.color
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
