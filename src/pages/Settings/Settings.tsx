import React, { useEffect } from "react";

import { Layout, PageHeader } from "antd";

import { Link } from "react-router-dom";
import SettingsForm from "./components/SettingsForm/SettingsForm";
import { useSettingsContext } from "hooks/settings";
import { SettingsContext } from "contexts/settings";

const Settings = () => {
  const settingsContext = useSettingsContext();

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
    <SettingsContext.Provider value={settingsContext}>
      <PageHeader
        className="site-page-header"
        title="Settings"
        breadcrumb={{
          routes,
          itemRender
        }}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SettingsForm />
      </Layout>
    </SettingsContext.Provider>
  );
};

export default Settings;
