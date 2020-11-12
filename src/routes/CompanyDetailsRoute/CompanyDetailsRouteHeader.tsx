import { Button, PageHeader, Tag } from "antd";
import React, { ReactElement, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CompanyContext } from "../../contexts/company";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRouteHeader({
  portfolioId,
  companyId
}: Props): ReactElement {
  const history = useHistory();
  const { company } = useContext(CompanyContext);


  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: company ? company.portfolioName : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      title={`${company?.name}`}
      onBack={() => history.push(`/portfolios/${portfolioId}`)}
      tags={
        <Tag color="blue">
          <a href={`${company?.url}`}>Link</a>
        </Tag>
      }
      breadcrumb={{
        routes,
        itemRender
      }}
      extra={[
        <Button
          onClick={() => {
            history.push(
              `/portfolios/${portfolioId}/companies/${company?.id}/add-shares`
            );
          }}
        >
          + Shares
        </Button>
      ]}
    />
  );
}
