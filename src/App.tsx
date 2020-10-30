import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout, Menu, Select } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";
import { getPortfolios } from "./daos/portfolio-dao";
import { PortfolioFields } from "./types/portfolio";
import PortfolioDetailsRoute from "./routes/PortfolioDetailsRoute";
import AddPortfolioRoute from "./routes/AddPortfolioRoute";
import AddCurrencyRoute from "./routes/AddCurrencyRoute";
import AddCompanyRoute from "./routes/AddCompanyRoute";
import AddMarketRoute from "./routes/AddMarketRoute";
import MarketListRoute from "./routes/MarketListRoute";
import SettingsRoute from "./routes/SettingsRoute/SettingsRoute";
import CurrencyListRoute from "./routes/CurrencyListRoute";
import SectorListRoute from "./routes/SectorListRoute/SectorListRoute";
import AddSectorRoute from "./routes/AddSectorRoute/AddSectorRoute";
import { SettingsContext } from "./contexts/settings";
import { SettingsItemProps } from "./types/settings";
import { getSettings, updateSettings } from "./daos/settings-dao";

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
    { key: "0", path: "/home", text: "Home" },
    { key: "-1", path: "/markets", text: "Markets" },
    { key: "-2", path: "/currencies", text: "Currencies" },
    { key: "-3", path: "/sectors", text: "Sectors" },
    { key: "-4", path: "/settings", text: "Settings" }
  ];

  let portfolioRoutes: RoutePathProps[] = [
    { key: "00", path: "/add/portfolio", text: "Add portfolio" }
  ];

  const [selectedKey, setSelectedKey] = useState(
    navLinks.find((item) => location.pathname.startsWith(item.path))?.key || ""
  );
  const [collapsed, setCollapsed] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [settings, setSettings] = useState<SettingsItemProps[]>([]);

  useEffect(() => {
    getPortfolios(setPortfolios);
  }, []);

  const onClickMenu = (item: any) => {
    console.log(item);
    let clicked = navLinks.find((_item) => _item.key === item.key);
    if (!clicked) {
      clicked = portfolioRoutes.find((_item) => _item.key === item.key);
    }
    history.push(clicked?.path || "");
  };

  useEffect(() => {
    getSettings(setSettings);
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    let selected =
      navLinks.find((item) => location.pathname.startsWith(item.path))?.key ||
      "";
    if (!selected) {
      selected =
        portfolioRoutes.find((item) => location.pathname.startsWith(item.path))
          ?.key || "";
    }
    setSelectedKey(selected);
  }, [location, navLinks, portfolioRoutes]);

  if (portfolios) {
    let portfoliosArray: RoutePathProps[] = [];
    portfolios.forEach((portfolio: PortfolioFields) => {
      // console.log(portfolio)
      portfoliosArray.push({
        key: portfolio.id.toString(),
        path: `/portfolios/${portfolio.id}`,
        text: portfolio.name
      });
    });
    portfolioRoutes = portfoliosArray;
  }

  function handleChange(value: string) {
    console.log(`selected ${value}`);
    const settings: SettingsItemProps = {
      selectedPortfolio: value
    };
    console.log(settings);
    updateSettings(settings, customSetSettings);
  }

  const customSetSettings = (result: SettingsItemProps[]) => {
    getSettings(setSettings);
    console.log(result);
  };

  return (
    <>
      <Layout data-testid="home-route">
        <Layout.Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ minHeight: "100vh" }}
        >
          <Menu
            theme="light"
            mode="inline"
            onClick={onClickMenu}
            selectedKeys={[selectedKey]}
          >
            {navLinks.map((item) => (
              <Menu.Item key={item.key}>{item.text}</Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout
          className="site-layout"
          style={{ minHeight: "100%", height: "100%" }}
        >
          <Layout.Header
            className="site-layout-background"
            // className="header"
            style={{
              padding: 0,
              width: "100%",
              position: "fixed",
              zIndex: 999
            }}
          >
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item
                className="trigger"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Menu.Item>
              <SettingsContext.Provider value={{ settings, setSettings }}>
                <Select
                  placeholder="Portfolios"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  value={settings[0]?.selectedPortfolio.toString()}
                >
                  {portfolios.map((item: PortfolioFields) => (
                    <Select.Option key={item.id} value={item.id.toString()}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </SettingsContext.Provider>

              <Menu.Item key="app" icon={<FolderOpenOutlined />}>
                Open portfolio
              </Menu.Item>
            </Menu>
          </Layout.Header>
          <Layout.Content
            className="site-layout-background"
            style={{
              margin: "80px 16px 24px 16px",
              padding: 10
            }}
          >
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            />
            <Route exact path="/home" component={HomeRoute} />
            <Route exact path="/settings" component={SettingsRoute} />
            <Route exact path="/add/portfolio" component={AddPortfolioRoute} />
            <Route exact path="/add/currency" component={AddCurrencyRoute} />
            <Route exact path="/add/market" component={AddMarketRoute} />
            <Route exact path="/markets" component={MarketListRoute} />
            <Route exact path="/currencies" component={CurrencyListRoute} />
            <Route exact path="/sectors" component={SectorListRoute} />
            <Route exact path="/add/sector" component={AddSectorRoute} />

            <Route
              exact
              path="/portfolios/:id"
              component={PortfolioDetailsRoute}
            />
            <Route
              exact
              path="/portfolios/:id/add-company"
              component={AddCompanyRoute}
            />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
