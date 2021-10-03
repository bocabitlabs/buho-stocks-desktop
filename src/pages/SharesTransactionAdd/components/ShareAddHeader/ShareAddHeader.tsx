import { PageHeader } from 'antd';
import React, { useContext, useEffect } from 'react'
import { CompaniesContext } from 'contexts/companies';
import { HomeOutlined } from '@ant-design/icons';
import { breadcrumbItemRender } from 'utils/headers-utils';
import { useTranslation } from 'react-i18next';

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function ShareAddHeader({companyId, portfolioId}: Props): React.ReactElement {
  const { company, getById: fetchCompany } = useContext(CompaniesContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany])

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
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
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-shares`,
      name: "add_shares",
      breadcrumbName: t("+ Add Shares")
    }
  ];

  return (
    <PageHeader
        className="site-page-header"
        title={t("Add Shares")}
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
        }}
      />
  )
}
