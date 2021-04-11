import { PageHeader } from 'antd';
import React, { useContext, useEffect } from 'react'
import { CompaniesContext } from 'contexts/companies';
import { HomeOutlined } from '@ant-design/icons';
import { breadcrumbItemRender } from 'utils/headers-utils';

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function ShareAddHeader({companyId, portfolioId}: Props): React.ReactElement {
  const { company, getById: fetchCompany } = useContext(CompaniesContext);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany])

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
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-shares`,
      name: "add_shares",
      breadcrumbName: "+ Add Shares"
    }
  ];

  return (
    <PageHeader
        className="site-page-header"
        title="Add Shares"
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
        }}
        subTitle="This is a subtitle"
      />
  )
}
