import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { MarketsContext } from "contexts/markets";
import React, { ReactElement, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  marketId: string;
}
export default function MarketAddRouteHeader({
  marketId
}: Props): ReactElement | null {
  const { market, getById: getMarketById } = useContext(MarketsContext);
  const { t } = useTranslation();

  useEffect(() => {
    getMarketById(marketId);
  }, [getMarketById, marketId]);

  if (!market) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/markets",
      name: "markets",
      breadcrumbName: t("Markets")
    },
    {
      path: `/markets/${marketId}/edit`,
      name: "edit",
      breadcrumbName: t("Edit")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Edit market")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}
