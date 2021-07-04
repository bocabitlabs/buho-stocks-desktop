import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import React, { useContext } from "react";
import { SectorsContext } from "contexts/sectors";
import { ISector } from "types/sector";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SectorListTable() {
  const { sectors, getAll, deleteById } = useContext(SectorsContext);
  const { t } = useTranslation();
  const key = "updatable";

  function confirm(recordId: string) {
    const result = deleteById(recordId);
    if (result.changes) {
      getAll();
      message.success({
        content: t("Sector has been deleted"),
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
      render: (text: string, record: any) => (
        <Link to={`/sectors/${record.id}/edit`}>{t(text)}</Link>
      ),
      sorter: (a: ISector, b: ISector) => a.name.localeCompare(b.name)
    },
    {
      title: t("Super sector"),
      dataIndex: "superSectorName",
      key: "superSectorName",
      render: (text: string, record: any) =>
        record.isSuperSector ? (
          <Tag color="green">{t("Is a super sector")}</Tag>
        ) : (
          <Link to={`/sectors/${record.id}/edit`}>{t(text)}</Link>
        ),
      sorter: (a: ISector, b: ISector) =>
        a.superSectorName && b.superSectorName
          ? a.superSectorName.localeCompare(b.superSectorName)
          : -1
    },
    {
      title: t("Action"),
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
              {t("Delete")}
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
