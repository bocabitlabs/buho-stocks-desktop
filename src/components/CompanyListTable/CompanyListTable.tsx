import { Button, Popconfirm, Space, Table } from "antd";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import CompanyService from "../../services/company-service";
import { CompanyItemProps } from "../../types/company";

interface IProps {
  portfolioId: string;
}

export default function CompanyListTable({ portfolioId }: IProps) {
  const { companies } = useContext(CompaniesContext);
  const history = useHistory();


  function confirm(recordId: string) {
    const result = new CompanyService().deleteCompanyById(recordId);
    if (result === "OK") {
      history.push({
        pathname: "/currencies",
        state: {
          message: { type: "success", text: "Company has been deleted" }
        }
      });
    }
  }

  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 70,

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
      title: "Total Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70
    },
    {
      title: "Total inv.",
      dataIndex: "total",
      key: "total",
      width: 70
    },
    {
      title: "Action",
      key: "action",
      width: 70,

      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`company-delete-${record.key}`}
            title={`Delete company ${record.name} and all it's contents?`}
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
    const companies2 = companies.map((company: CompanyItemProps) => ({
      id: company.id,
      key: company.id,
      name: company.name,
      ticker: company.ticker,
      sectorName: company.sectorName,
      currency: company.currencyName,
      color: company.color,
      sharesNumber:
        (company.buySharesNumber || 0) - (company.sellSharesNumber || 0),
      total: (company.buyTotal || 0) - (company.sellTotal || 0),
      commission: (company.buyCommission || 0) + (company.sellCommission || 0)
    }));
    return companies2;
  };
  console.log(companies.length)
  return (
    <Table
        size="small"
        style={{ maxWidth: "max(500px, 76vw)" }}
        scroll={{ x: 800 }}
        bordered
        columns={columns1}
        dataSource={getData()}
      />
  );
}
