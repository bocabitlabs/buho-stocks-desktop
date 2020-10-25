import React from "react";

import { Button, Layout, PageHeader } from "antd";

import { Link, useHistory } from "react-router-dom";
import MarketListTable from "../components/MarketListTable/MarketListTable";

const MarketListRoute = () => {
  const history = useHistory();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/markets",
      name: "market",
      breadcrumbName: "Markets"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Markets"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
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
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketListTable />
      </Layout>
    </>
  );
};

export default MarketListRoute;