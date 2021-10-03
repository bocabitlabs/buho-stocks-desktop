import { PageHeader } from 'antd';
import React, { ReactElement, useContext } from 'react'
import { CompaniesContext } from 'contexts/companies';
import { HomeOutlined } from '@ant-design/icons';
import { breadcrumbItemRender } from 'utils/headers-utils';
import { useTranslation } from 'react-i18next';

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function DividendsTransactionAddHeader({companyId, portfolioId}: Props): ReactElement {
  const { company } = useContext(CompaniesContext);
  const { t } = useTranslation();

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
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-dividends`,
      name: "add_dividends",
      breadcrumbName: t("+ Add Dividends")
    }
  ];

  return (
    <PageHeader
        className="site-page-header"
        title={t("Add dividends")}
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
        }}
      />
  )
}
