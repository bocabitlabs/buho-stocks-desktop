import React from "react";

import { Layout, PageHeader } from "antd";

import AddPortfolioForm from "../components/AddPortfolioForm/AddPortfolioForm";
import { Link } from "react-router-dom";

const AddPortfolioRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-portfolio",
      name: "add-portfolio",
      breadcrumbName: "Add portfolio"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a portfolio"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddPortfolioForm />
      </Layout>
    </>
  );
};

export default AddPortfolioRoute;
