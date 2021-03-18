import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { MarketsContext } from "contexts/markets";
import MarketService from "services/market-service";
import { Market } from "types/market";
import { Link } from "react-router-dom";
import CountryFlag from "components/CountryFlag/CountryFlag";

export default function MarketListTable() {
  const { markets, fetchMarkets } = useContext(MarketsContext);
  const key = "updatable";

  function confirm(recordId: string) {
    const result = MarketService.deleteById(recordId);
    if (result.changes) {
      fetchMarkets();
      message.success({
        content: "Market has been deleted",
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
      render: (text: string, record: any) => <Link to={`/markets/${record.id}/edit`}>{text}</Link>,
      sorter: (a: Market, b: Market) => a.name.localeCompare(b.name)
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: Market, b: Market) => a.description.localeCompare(b.description)
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (text: string, record: any) => (<CountryFlag code={text}/>),
      sorter: (a: Market, b: Market) => a.region.localeCompare(b.region)
    },
    {
      title: "Opening Time",
      dataIndex: "openTime",
      key: "openTime",
      sorter: (a: Market, b: Market) => a.openTime.localeCompare(b.openTime)
    },
    {
      title: "Closing Time",
      dataIndex: "closeTime",
      key: "closeTime",
      sorter: (a: Market, b: Market) => a.closeTime.localeCompare(b.closeTime)
    },
    {
      title: "Action",
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
    return markets.map((market: Market) => ({
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
