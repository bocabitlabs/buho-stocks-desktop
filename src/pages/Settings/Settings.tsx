import React, { useEffect } from "react";

import { Descriptions, Layout, PageHeader } from "antd";

import { Link } from "react-router-dom";
import SettingsForm from "./components/SettingsForm/SettingsForm";
import { useSettingsContext } from "hooks/settings";
import { SettingsContext } from "contexts/settings";
import { version } from "utils/app-info";

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
        <Descriptions title="App Info">
          <Descriptions.Item label="Version">{version}</Descriptions.Item>
        </Descriptions>
        <SettingsForm />
      </Layout>
    </SettingsContext.Provider>
  );
};

export default Settings;
