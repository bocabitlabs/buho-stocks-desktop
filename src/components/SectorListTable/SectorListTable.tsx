import { Button, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SectorsContext } from "../../contexts/sectors";
import SectorService from "../../services/sector-service";
import { SectorItemProps } from "../../types/sector";

export default function SectorListTable() {
  const { sectors } = useContext(SectorsContext);
  const history = useHistory();

  function confirm(recordId: string) {
    const result = new SectorService().deleteSectorById(recordId);
    if (result === "OK") {
      history.push({
        pathname: "/currencies",
        state: {
          message: { type: "success", text: "Currency has been deleted" }
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
