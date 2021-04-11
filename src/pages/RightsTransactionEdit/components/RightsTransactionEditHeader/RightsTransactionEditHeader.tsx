import { PageHeader } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { CompaniesContext } from "contexts/companies";
import { HomeOutlined } from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  companyId: string;
  portfolioId: string;
  transactionId: string;
}

export default function RightsTransactionEditHeader({
  companyId,
  portfolioId,
  transactionId
}: Props): ReactElement {
  const { company, getById: fetchCompany } = useContext(CompaniesContext);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

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
      path: `/portfolios/${portfolioId}/companies/${companyId}?tab=rights`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}/rights/${transactionId}/edit`,
      name: "edit_rights",
      breadcrumbName: "Edit rights transaction"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Edit rights transaction"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
