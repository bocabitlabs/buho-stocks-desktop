import { PageHeader } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { CompaniesContext } from "contexts/companies";
import { HomeOutlined } from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function RightsTransactionAddHeader({
  companyId,
  portfolioId
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
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-rights`,
      name: "add_rights",
      breadcrumbName: "+ Add Rights"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Add Rights"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
