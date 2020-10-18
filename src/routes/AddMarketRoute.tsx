import React from "react";

import { Layout, PageHeader } from "antd";

import { Link } from "react-router-dom";
import AddMarketForm from "../components/AddMarketForm/AddMarketForm";

const AddMarketRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-market",
      name: "add-market",
      breadcrumbName: "Add market"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a market"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddMarketForm />
      </Layout>
    </>
  );
};

export default AddMarketRoute;