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

  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 20,

      render: (text: string, record: any) => (
        <Link to={`/portfolios/${portfolioId}/companies/${record.id}`}>
          {text}
        </Link>
      )
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      width: 70
    },
    {
      title: "Sector",
      dataIndex: "sectorName",
      key: "sectorName",
      width: 70
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 70
    },
    {
      title: "Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      width: 70
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 70
    },
    {
      title: "Action",
      key: "action",
      width: 70,

      render: (text: string, record: { name: string }) => (
        <Space size="middle">
          Delete
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
      sectorName: company.sectorName,
      currency: company.currency,
      sharesNumber:
        (company.buySharesNumber || 0) - (company.sellSharesNumber || 0),
      total: (company.buyTotal || 0) - (company.sellTotal || 0),
      commission: (company.buyCommission || 0) + (company.sellCommission || 0)
    }));
    return companies2;
  };

  return (
    <>
      <Table
        size="small"
        style={{ maxWidth: "max(500px, 76vw)" }}
        columns={columns1}
        dataSource={getData()}
        scroll={{ x: 800 }}
        bordered

      />
    </>
  );
}
