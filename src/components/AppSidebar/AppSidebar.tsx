import {
  BankOutlined,
  ClusterOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  ImportOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { SettingsContext } from "contexts/settings";


interface RoutePathProps {
  key: string;
  path: string;
  text: string;
  icon: ReactElement;
}

const navLinks: RoutePathProps[] = [
  { key: "0", path: "/home", text: "Home", icon: <HomeOutlined /> },
  { key: "-1", path: "/markets", text: "Markets", icon: <BankOutlined /> },
  {
    key: "-2",
    path: "/currencies",
    text: "Currencies",
    icon: <DollarCircleOutlined />
  },
  { key: "-3", path: "/sectors", text: "Sectors", icon: <ClusterOutlined /> },
  {
    key: "-5",
    path: "/import-export",
    text: "Import & Export",
    icon: <ImportOutlined />
  },

  {
    key: "-6",
    path: "/settings",
    text: "Settings",
    icon: <SettingOutlined />
  }
];

export default function AppSidebar(): ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { settings } = useContext(SettingsContext);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef(null);
  const { t } = useTranslation();

  const [selectedKey, setSelectedKey] = useState(
    navLinks.find((item) => location.pathname.startsWith(item.path))?.key || ""
  );

  const onClickMenu = (item: any) => {
    let clicked = navLinks.find((_item) => _item.key === item.key);
    history.push(clicked?.path || "");
  };

  useEffect(() => {
    let selected =
      navLinks.find((item) => location.pathname.startsWith(item.path))?.key ||
      "";
    setSelectedKey(selected);
  }, [location]);

  useEffect(() => {
    if(settings !== null){
      const { collapsed } = settings;
      setIsCollapsed(collapsed);
    }
  }, [settings]);


  return (
    <Layout.Sider
      breakpoint="lg"
      theme="light"
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{ minHeight: "100vh" }}
      id="sidebar"
      ref={sidebarRef}
    >
      <Menu
        theme="light"
        mode="inline"
        onClick={onClickMenu}
        selectedKeys={[selectedKey]}
      >
        {navLinks.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {t(item.text)}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
}
