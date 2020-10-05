import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, useHistory, useLocation } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout, Menu } from "antd";

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
    <Layout data-testid="home-route">
      <Layout.Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClickMenu}
          selectedKeys={[selectedKey]}
        >
          {navLinks.map((item) => (
            <Menu.Item key={item.key}>{item.text}</Menu.Item>
          ))}
        </Menu>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            onClick={onClickMenu}
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {navLinks.map((item) => (
            <Menu.Item key={item.key}>{item.text}</Menu.Item>
          ))}
          </Menu>
        </Layout.Sider>

        <Route exact path="/home" component={HomeRoute} />
        {/* <Route
          exact
          path="/company/:companyId"
          component={CompanyDetailsRoute}
        /> */}
      </Layout>
    </Layout>
  );
}

export default App;
