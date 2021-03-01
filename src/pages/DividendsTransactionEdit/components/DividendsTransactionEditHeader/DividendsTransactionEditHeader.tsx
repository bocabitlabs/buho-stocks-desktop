import { PageHeader } from "antd";
import React, { ReactElement, useContext } from "react";
import { CompaniesContext } from "contexts/companies";
import { HomeOutlined } from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  companyId: string;
  portfolioId: string;
  transactionId: string;
}

export default function DividendsTransactionEditdHeader({
  companyId,
  portfolioId,
  transactionId
}: Props): ReactElement {
  const { company } = useContext(CompaniesContext);

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
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
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}/dividends/${transactionId}`,
      name: "edit_dividends",
      breadcrumbName: "Edit Dividens transaction"
    }
  ];


  return (
    <PageHeader
      className="site-page-header"
      title="Edit dividends transaction"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
