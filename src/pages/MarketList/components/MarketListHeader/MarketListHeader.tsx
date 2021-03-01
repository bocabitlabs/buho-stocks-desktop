import { HomeOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function MarketListRouteHeader(): ReactElement {
  const history = useHistory();

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
      name: "market",
      breadcrumbName: "Markets"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Markets"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          onClick={() => {
            history.push("/add/market");
          }}
        >
          Add market
        </Button>
      ]}
    />
  );
}
