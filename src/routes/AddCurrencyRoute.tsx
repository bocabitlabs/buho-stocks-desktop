import React from "react";

import { Layout, PageHeader } from "antd";

import AddCurrencyForm from "../components/AddCurrencyForm/AddCurrencyForm";
import { Link } from "react-router-dom";

const AddCurrencyRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-currency",
      name: "add-currency",
      breadcrumbName: "Add currency"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a currency"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddCurrencyForm />
      </Layout>
    </>
  );
};

export default AddCurrencyRoute;