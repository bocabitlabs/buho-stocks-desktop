import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { SectorsContext } from "contexts/sectors";
import SectorService from "services/sector-service";
import { ISector } from "types/sector";
import { Link } from "react-router-dom";

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
      render: (text: string, record: any) => <Link to={`/sectors/${record.id}/edit`}>{text}</Link>,
      sorter: (a: ISector, b: ISector) => a.name.localeCompare(b.name)
    },
    {
      title: "Super sector",
      dataIndex: "superSectorName",
      key: "superSectorName",
      render: (text: string, record: any) => record.isSuperSector? "Is a super sector": <Link to={`/sectors/${record.id}/edit`}>{text}</Link>,
      sorter: (a: ISector, b: ISector) => (a.superSectorName && b.superSectorName)? a.superSectorName.localeCompare(b.superSectorName): -1
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
            <Button danger type="text">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const getData = () => {
    return sectors.map((sector: ISector) => ({
      id: sector.id,
      key: sector.id,
      name: sector.name,
      color: sector.color,
      superSectorName: sector.superSectorName,
      isSuperSector: sector.isSuperSector
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
