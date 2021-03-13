import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { PortfoliosContext } from "contexts/portfolios";
import React, { ReactElement, useContext, useEffect } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  portfolioId: string;
}
export default function PortfolioEditHeader({
  portfolioId
}: Props): ReactElement | null {

  const { portfolio, getById: getPortfolioById } = useContext(
    PortfoliosContext
  );

  useEffect(() => {
    getPortfolioById(portfolioId);
  }, [getPortfolioById, portfolioId]);

  if (!portfolio) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/portfolios",
      name: "portfolios",
      breadcrumbName: "Portfolios"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolios",
      breadcrumbName: portfolio.name
    },
    {
      path: `/portfolios/${portfolioId}/edit`,
      name: "edit",
      breadcrumbName: "Edit"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Edit portfolio"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
