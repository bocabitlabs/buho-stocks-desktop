import {
  BankOutlined,
  ClusterOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
interface RoutePathProps {
  key: string;
  path: string;
  text: string;
  icon: ReactElement;
}

interface AppSidebarProps {
  isCollapsed: boolean;
}

export default function AppSidebar({isCollapsed}: AppSidebarProps): ReactElement {
  const history = useHistory();
  const location = useLocation();
  // const { settings } = useContext(
  //   SettingsContext
  // );

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
      key: "-4",
      path: "/settings",
      text: "Settings",
      icon: <SettingOutlined />
    }
  ];

  const [selectedKey, setSelectedKey] = useState(
    navLinks.find((item) => location.pathname.startsWith(item.path))?.key || ""
  );

  const onClickMenu = (item: any) => {
    console.log(item);
    let clicked = navLinks.find((_item) => _item.key === item.key);
    history.push(clicked?.path || "");
  };

  useEffect(() => {
    console.log(location.pathname);
    let selected =
      navLinks.find((item) => location.pathname.startsWith(item.path))?.key ||
      "";
    setSelectedKey(selected);
  }, [location, navLinks]);

  return (
    <Layout.Sider
      breakpoint="lg"
      theme="light"
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{ minHeight: "100vh" }}
    >
      <Menu
        theme="light"
        mode="inline"
        onClick={onClickMenu}
        selectedKeys={[selectedKey]}
      >
        {navLinks.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.text}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
}
