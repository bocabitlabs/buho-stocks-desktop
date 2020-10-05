import React, { useState, useEffect } from "react";
import {
  Route,
  useLocation,
  useHistory
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import LoginRoute from "./routes/LoginRoute/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute/RegisterRoute";
import HomeRoute from "./routes/HomeRoute/HomeRoute";
import CompanyDetailsRoute from "./routes/CompanyDetailsRoute/CompanyDetailsRoute";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined
} from "@ant-design/icons";

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

        <PrivateRoute exact path="/home" component={HomeRoute} />
        <Route exact path="/login" component={LoginRoute} />
        <Route exact path="/register" component={RegisterRoute} />
        <Route
          exact
          path="/company/:companyId"
          component={CompanyDetailsRoute}
        />
      </Layout>
      <Layout.Footer style={{ textAlign: "center" }}>
        Location:{JSON.stringify(location)}
        Selected key: {JSON.stringify(selectedKey)}
        Buho Stocks ©2020 by Bocabitlabs
      </Layout.Footer>
    </Layout>
  );
}

export default App;
