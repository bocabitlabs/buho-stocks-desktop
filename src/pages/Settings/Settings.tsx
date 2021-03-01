import React, { useEffect } from "react";

import { Descriptions, Layout, PageHeader } from "antd";

import SettingsForm from "./components/SettingsForm/SettingsForm";
import { useSettingsContext } from "hooks/settings";
import { SettingsContext } from "contexts/settings";
import { version } from "utils/app-info";
import { HomeOutlined } from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";

const Settings = () => {
  const settingsContext = useSettingsContext();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: `/settings`,
      name: "settings",
      breadcrumbName: "Settings"
    }
  ];

  useEffect(() => {}, []);

  return (
    <SettingsContext.Provider value={settingsContext}>
      <PageHeader
        className="site-page-header"
        title="Settings"
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
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
