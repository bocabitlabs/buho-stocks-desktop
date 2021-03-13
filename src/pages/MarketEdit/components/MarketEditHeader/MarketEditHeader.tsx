import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { MarketsContext } from "contexts/markets";
import React, { ReactElement, useContext, useEffect } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  marketId: string;
}
export default function MarketAddRouteHeader({
  marketId
}: Props): ReactElement| null {

  const { market, getById: getMarketById } = useContext(
    MarketsContext
  );

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
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/markets",
      name: "markets",
      breadcrumbName: "Markets"
    },
    {
      path: `/markets/${marketId}/edit`,
      name: "edit",
      breadcrumbName: "Edit"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Edit market"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

