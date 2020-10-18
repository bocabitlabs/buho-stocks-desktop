import React from "react";

import { Layout, PageHeader } from "antd";

import AddPortfolioForm from "../components/AddPortfolioForm/AddPortfolioForm";
import { Link } from "react-router-dom";
import MarketListTable from "../components/MarketListTable/MarketListTable";

const MarketListRoute = () => {
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
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <MarketListTable />
      </Layout>
    </>
  );
};

export default MarketListRoute;
