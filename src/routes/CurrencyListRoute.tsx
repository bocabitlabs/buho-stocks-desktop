import React from "react";

import { Button, Layout, PageHeader } from "antd";

import { Link, useHistory } from "react-router-dom";
import CurrencyListTable from "../components/CurrencyListTable/CurrencyListTable";

const CurrencyListRoute = () => {
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
    <>
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
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <CurrencyListTable />
      </Layout>
    </>
  );
};

export default CurrencyListRoute;
