import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";

export default function CurrencyListRouteHeader(): ReactElement {
  const history = useHistory();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/currencies",
      name: "currencies",
      breadcrumbName: "Currencies"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Currencies"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
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
