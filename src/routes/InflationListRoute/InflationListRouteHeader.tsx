import React, { ReactElement } from 'react'

import { Button, PageHeader } from "antd";
import { Link, useHistory } from "react-router-dom";

export default function InflationListRouteHeader(): ReactElement {
  const history = useHistory();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/inflations",
      name: "inflation",
      breadcrumbName: "Inflations"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Inflations"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
      extra={[
        <Button
          onClick={() => {
            history.push("/add/inflation");
          }}
        >
          Add inflation
        </Button>
      ]}
    />
  );
}

