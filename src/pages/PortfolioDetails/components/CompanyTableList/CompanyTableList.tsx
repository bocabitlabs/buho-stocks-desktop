import { Table, Typography } from "antd";
import CountryFlag from "components/CountryFlag/CountryFlag";
import { CompaniesContext } from "contexts/companies";
import { Company } from "models/company";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { ICompany } from "types/company";
import { StringUtils } from "utils/string-utils";

interface Props {
  portfolioId: string;
}

export default function CompanyTableList({ portfolioId }: Props): ReactElement {
  const { companies } = useContext(CompaniesContext);

  const columns: any = [
    {
      title: "Country",
      dataIndex: "countryCode",
      key: "countryCode",
      render: (text: string, record: any) => <CountryFlag code={text} />,
      sorter: (a: Company, b: Company) =>
        a.countryCode && b.countryCode
          ? a.countryCode.localeCompare(b.countryCode)
          : 0
    },
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
      render: (text: string, record: any) => (
        <>
          <Link to={`/portfolios/${portfolioId}/companies/${record.id}`}>
            {text}
          </Link>

          {record.superSectorName !== null && (
            <>
              <br />
              <Typography.Text
                type="secondary"
                style={{ fontSize: "0.8em" }}
                title={record.superSectorName}
              >
                {record.superSectorName}
              </Typography.Text>
            </>
          )}
        </>
      ),
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name)
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (text: string, record: any) => text,
      sorter: (a: Company, b: Company) => a.ticker.localeCompare(b.ticker)
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      render: (text: string, record: any) => text,
      sorter: (a: any, b: any) => a.shares - b.shares
    },
    {
      title: "Invested",
      dataIndex: "invested",
      key: "invested",
      render: (text: string, record: any) =>
        StringUtils.getAmountWithSymbol(
          +text,
          2,
          record.portfolioCurrencySymbol
        ),
      sorter: (a: any, b: any) => a.invested - b.invested
    },
    {
      title: "Portfolio value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      render: (text: string, record: any) =>
        StringUtils.getAmountWithSymbol(
          +text,
          2,
          record.portfolioCurrencySymbol
        ),
      sorter: (a: any, b: any) => a.portfolioValue - b.portfolioValue
    },
    {
      title: "Return",
      dataIndex: "return",
      key: "return",
      render: (text: string, record: any) =>
        StringUtils.getAmountWithSymbol(+text, 2, "%"),
      sorter: (a: any, b: any) => a.return - b.return
    }
  ];

  const getData = () => {
    return companies.map((company: ICompany) => ({
      id: company.id,
      key: company.id,
      color: company.color,
      countryCode: company.countryCode,
      invested: company.investment.getTotalInvested(true),
      name: company.name,
      portfolioCurrencySymbol: company.portfolioCurrencySymbol,
      portfolioValue: company.portfolioValue.getPortfolioValue(true),
      return: company.returns.getReturnWithDividendsPercentage(true),
      shares: company.shares.getSharesCount(),
      ticker: company.ticker,
      sectorName: company.sectorName,
      superSectorName: company.superSectorName
    }));
  };

  return <Table columns={columns} dataSource={getData()} />;
}
