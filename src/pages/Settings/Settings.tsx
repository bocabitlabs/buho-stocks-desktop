import React, { useEffect } from "react";

import { Descriptions, Layout, PageHeader } from "antd";

import SettingsForm from "./components/SettingsForm/SettingsForm";
import { useSettingsContext } from "hooks/settings/use-settings-context";
import { SettingsContext } from "contexts/settings";
import { version } from "utils/app-info";
import { HomeOutlined } from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const settingsContext = useSettingsContext();
  const { t } = useTranslation();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: `/settings`,
      name: "settings",
      breadcrumbName: t("Settings")
    }
  ];

  useEffect(() => {}, []);

  return (
    <SettingsContext.Provider value={settingsContext}>
      <PageHeader
        className="site-page-header"
        title={t("Settings")}
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
        }}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <Descriptions title={t("App Info")}>
          <Descriptions.Item label={t("Version")}>{version}</Descriptions.Item>
        </Descriptions>
        <SettingsForm />
      </Layout>
    </SettingsContext.Provider>
  );
};

export default Settings;
