import { Button, message, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { InflationsContext } from "contexts/inflations";
import InflationService from "services/inflation/inflation-service";
import { InflationItemProps } from "types/inflation";

export default function InflationListTable() {
  const { inflations, fetchInflations } = useContext(InflationsContext);
  const key = "updatable";

  function confirm(recordId: string) {
    const result = InflationService.deleteById(recordId);
    if (result.changes) {
      fetchInflations();
      message.success({
        content: "Inflation has been deleted",
        key,
        duration: 2
      });
    }
  }

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text: string) => text
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
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
    return inflations.map((inflation: InflationItemProps) => ({
      key: inflation.id,
      year: inflation.year,
      percentage: inflation.percentage
    }));
  };

  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}
