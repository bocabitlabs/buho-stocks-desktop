import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getCompanies } from "../../daos/company-dao";
import { getSectorById } from "../../daos/sector-dao";
import { CompanyItemProps } from "../../types/company";

export default function CompanyListTable() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies(setCompanies);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker"
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector"
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency"
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
    console.log(companies);
    const companies2 = companies.map((company: CompanyItemProps) => ({
      key: company.id,
      name: company.name,
      ticker: company.ticker,
      sector: company.sector,
      currency: company.currency
    }));
    // console.log(companies2);
    return companies2;
  };
  return <Table columns={columns} dataSource={getData()} />;
}
