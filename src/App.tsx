import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, useHistory, useLocation } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout, Menu } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

interface RoutePathProps {
  key: string;
  path: string;
  text: string;
}

function App() {
  /**
   * Main
   */
  const location = useLocation();
  const history = useHistory();

  const navLinks: RoutePathProps[] = [
    { key: "1", path: "/home", text: "Home" },
    { key: "2", path: "/settings", text: "Settings" }
  ];

  const [selectedKey, setSelectedKey] = useState(
    navLinks.find((item) => location.pathname.startsWith(item.path))?.key || ""
  );
  const [collapsed, setCollapsed] = useState(false);

  const onClickMenu = (item: any) => {
    console.log(item);
    const clicked = navLinks.find((_item) => _item.key === item.key);
    console.log(clicked);
    history.push(clicked?.path || "");
  };

  useEffect(() => {
    setSelectedKey(
      navLinks.find((item) => location.pathname.startsWith(item.path))?.key ||
        ""
    );
  }, [location, navLinks]);

  return (
    <Layout data-testid="home-route" style={{height: '100vh'}}>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={onClickMenu}
          selectedKeys={[selectedKey]}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          {navLinks.map((item) => (
            <Menu.Item key={item.key}>{item.text}</Menu.Item>
          ))}
          </Menu>
        </Layout.Sider>
        <Layout className="site-layout">
          <Layout.Header className="site-layout-background" style={{ padding: 0 }}>

          </Layout.Header>
          <Layout.Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route exact path="/home" component={HomeRoute} />
          </Layout.Content>
        </Layout>
      </Layout>
  );
}

export default App;
