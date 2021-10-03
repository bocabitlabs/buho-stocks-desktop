import React, { ReactElement, useContext, useEffect } from 'react'

import { PageHeader } from "antd";
import { PortfoliosContext } from 'contexts/portfolios';
import { HomeOutlined } from '@ant-design/icons';
import { breadcrumbItemRender } from 'utils/headers-utils';
import { useTranslation } from 'react-i18next';

interface Props {
  portfolioId: string;
}

export default function TransactionsLogListHeader({portfolioId}: Props): ReactElement {
  const { portfolio, getById } = useContext(PortfoliosContext);

  useEffect(() => {
    getById(portfolioId);
  }, [portfolioId, getById]);
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
      breadcrumbName: portfolio ? portfolio.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/logs`,
      name: "logs",
      breadcrumbName: t("Logs")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Logs")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

