import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import MarketService from "../../services/market-service";
import { MarketItemProps } from "../../types/market";

export default function MarketListTable() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    new MarketService().getMarkets(setMarkets);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region"
    },
    {
      title: "Opening Time",
      dataIndex: "openingTime",
      key: "openingTime"
    },
    {
      title: "Closing Time",
      dataIndex: "closingTime",
      key: "closingTime"
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
    return markets.map((market: MarketItemProps) => ({
      key: market.id,
      name: market.name,
      description: market.description,
      region: market.region,
      openingTime: market.openTime,
      closingTime: market.closeTime
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
