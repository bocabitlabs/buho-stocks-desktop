import { HomeOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function CurrencyListHeader(): ReactElement {
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
      path: "/currencies",
      name: "currencies",
      breadcrumbName: "Currencies"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Currencies"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          onClick={() => {
            history.push("/add/currency");
          }}
        >
          Add Currency
        </Button>
      ]}
    />
  );
}
