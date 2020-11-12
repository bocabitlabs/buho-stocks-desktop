import { Button, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MarketsContext } from "../../contexts/markets";
import MarketService from "../../services/market-service";
import { MarketItemProps } from "../../types/market";

export default function MarketListTable() {
  const { markets } = useContext(MarketsContext);
  const history = useHistory();

  function confirm(recordId: string) {
    const result = new MarketService().deleteMarketById(recordId);
    if (result === "OK") {
      history.push({
        pathname: "/markets",
        state: {
          message: { type: "success", text: "Market has been deleted" }
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
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`market-delete-${record.key}`}
            title={`Delete market ${record.name}?`}
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
