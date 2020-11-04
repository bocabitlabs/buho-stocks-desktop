import { Space, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import { CompanyItemProps } from "../../types/company";

interface IProps {
  portfolioId: string;
}

export default function CompanyListTable({ portfolioId }: IProps) {
  const { companies, fetchCompanies } = useContext(CompaniesContext);

  useEffect(() => {
    fetchCompanies(portfolioId);
  }, [fetchCompanies, portfolioId]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Link to={`/portfolios/${portfolioId}/companies/${record.id}`}>
          {text}
        </Link>
      )
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
      title: "Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber"
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total"
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
    const companies2 = companies.map((company: CompanyItemProps) => ({
      id: company.id,
      key: company.id,
      name: company.name,
      ticker: company.ticker,
      sector: company.sector,
      currency: company.currency,
      sharesNumber: company.sharesNumber,
      total: company.total
    }));
    return companies2;
  };
  return <Table columns={columns} dataSource={getData()} />;
}
