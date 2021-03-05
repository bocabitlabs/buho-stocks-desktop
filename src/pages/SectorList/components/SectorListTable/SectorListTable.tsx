import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { SectorsContext } from "contexts/sectors";
import SectorService from "services/sector-service";
import { Sector } from "types/sector";

export default function SectorListTable() {
  const { sectors, fetchSectors } = useContext(SectorsContext);
  const key = "updatable";

  function confirm(recordId: string) {
    const result = SectorService.deleteById(recordId);
    if (result.changes) {
      fetchSectors();
      message.success({
        content: "Sector has been deleted",
        key,
        duration: 2
      });
    }
  }

  const columns = [
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
      render: (text: string) => text
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`sector-delete-${record.key}`}
            title={`Delete sector ${record.name}?`}
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
    return sectors.map((sector: Sector) => ({
      key: sector.id,
      name: sector.name,
      color: sector.color
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
