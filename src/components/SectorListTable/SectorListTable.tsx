import { Space, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { SectorsContext } from "../../contexts/sectors";
import { SectorItemProps } from "../../types/sector";

export default function SectorListTable() {
  const { sectors, fetchSectors } = useContext(SectorsContext);

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

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
    return sectors.map((sector: SectorItemProps) => ({
      key: sector.id,
      name: sector.name
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
