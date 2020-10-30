import React, { useEffect } from "react";

import { Layout, PageHeader } from "antd";

import { Link } from "react-router-dom";
import AddSampleCurrenciesForm from "../../components/AddSampleCurrenciesForm/AddSampleCurrenciesForm";
import AddSampleMarketsForm from "../../components/AddSampleMarketsForm/AddSampleMarketsForm";
import SettingsForm from "../../components/SettingsForm/SettingsForm";

const SettingsRoute = () => {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/settings`,
      name: "settings",
      breadcrumbName: "Settings"
    }
  ];

  useEffect(() => {}, []);

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Settings"
        breadcrumb={{
          routes,
          itemRender
        }}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SettingsForm/>
      </Layout>
    </>
  );
};

export default SettingsRoute;
