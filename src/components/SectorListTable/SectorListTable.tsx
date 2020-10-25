import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getSectors } from "../../daos/sector-dao";
import { SectorItemProps } from "../../types/sector";

export default function SectorListTable() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    getSectors(setSectors);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>
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
    return sectors.map((currency: SectorItemProps) => ({
      key: currency.id,
      name: currency.name
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
