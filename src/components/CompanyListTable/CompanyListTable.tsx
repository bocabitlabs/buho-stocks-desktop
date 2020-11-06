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

  // const columns: ColumnsType<object> = [
  //   {
  //     title: "Full Name",
  //     width: 100,
  //     dataIndex: "name",
  //     key: "name",
  //     fixed: "left"
  //   },
  //   {
  //     title: "Age",
  //     width: 100,
  //     dataIndex: "age",
  //     key: "age",
  //     fixed: "left"
  //   },
  //   {
  //     title: "Column 1",
  //     dataIndex: "address",
  //     key: "1",
  //     width: 150
  //   },
  //   {
  //     title: "Column 2",
  //     dataIndex: "address",
  //     key: "2",
  //     width: 150
  //   },
  //   {
  //     title: "Column 3",
  //     dataIndex: "address",
  //     key: "3",
  //     width: 150
  //   },
  //   {
  //     title: "Column 4",
  //     dataIndex: "address",
  //     key: "4",
  //     width: 150
  //   },
  //   {
  //     title: "Column 5",
  //     dataIndex: "address",
  //     key: "5",
  //     width: 150
  //   },
  //   {
  //     title: "Column 6",
  //     dataIndex: "address",
  //     key: "6",
  //     width: 150
  //   },
  //   {
  //     title: "Column 7",
  //     dataIndex: "address",
  //     key: "7",
  //     width: 150
  //   },
  //   { title: "Column 8", dataIndex: "address", key: "8" },
  //   {
  //     title: "Action",
  //     key: "operation",
  //     width: 100,
  //     render: () => <a>action</a>
  //   }
  // ];

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edrward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`
  //   });
  // }

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
      {/* <Table
        size="small"
        style={{ maxWidth: "max(500px, 76vw)" }}
        // style={{ width: 'auto'}}
        columns={columns}
        dataSource={data}
        bordered
        // scroll={{ x: 400 }}

        scroll={{ x: 1500 }}
      /> */}
    </>
  );
}
