import React, { useEffect, useState } from "react";
import "./App.css";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout, Menu } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";
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
import { useSettingsContext } from "./hooks/settings";
import PortfolioSelector from "./components/PortfolioSelector/PortfolioSelector";
import { PortfoliosContext } from "./contexts/portfolios";
import { usePortfoliosContext } from "./hooks/portfolios";
import { useCurrenciesContext } from "./hooks/currencies";
import { CurrenciesContext } from "./contexts/currencies";
import { useSectorsContext } from "./hooks/sectors";
import { SectorsContext } from "./contexts/sectors";

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
  const settingsContext = useSettingsContext();
  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();

  const onClickMenu = (item: any) => {
    console.log(item);
    let clicked = navLinks.find((_item) => _item.key === item.key);
    if (!clicked) {
      clicked = portfolioRoutes.find((_item) => _item.key === item.key);
    }
    history.push(clicked?.path || "");
  };

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

  return (
    <>
      <div id="left" className="column">
        <div className="top-left">

        </div>
        <div className="bottom">
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
        </div>
      </div>
      <div id="right" className="column">
        <div className="top-right">
        <Layout.Header
            className="site-layout-background"
            // className="header"
            style={{
              padding: 0,
              width: "100%",
              // position: "fixed",
              // zIndex: 999
            }}
          >
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item
                className="trigger"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Menu.Item>
              <SettingsContext.Provider value={settingsContext}>
                <PortfoliosContext.Provider value={portfoliosContext}>
                  <PortfolioSelector />
                </PortfoliosContext.Provider>
              </SettingsContext.Provider>

              <Menu.Item key="app" icon={<FolderOpenOutlined />}>
                Open portfolio
              </Menu.Item>
            </Menu>
          </Layout.Header>
        </div>
        <div className="bottom">
        <Layout.Content
            className="site-layout-background"
            style={{
              margin: "16px",
              padding: 10,
            }}
          >
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            />
            <Route exact path="/home">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <HomeRoute />
              </PortfoliosContext.Provider>
            </Route>
            <Route exact path="/settings">
              <SettingsContext.Provider value={settingsContext}>
                <SettingsRoute />
              </SettingsContext.Provider>
            </Route>
            <Route exact path="/add/portfolio">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <CurrenciesContext.Provider value={currenciesContext}>
                  <AddPortfolioRoute />
                </CurrenciesContext.Provider>
              </PortfoliosContext.Provider>
            </Route>
            <Route exact path="/add/currency">
              <CurrenciesContext.Provider value={currenciesContext}>
                <AddCurrencyRoute />
              </CurrenciesContext.Provider>
            </Route>
            <Route exact path="/add/market" component={AddMarketRoute} />
            <Route exact path="/markets" component={MarketListRoute} />
            <Route exact path="/currencies">
              <CurrenciesContext.Provider value={currenciesContext}>
                <CurrencyListRoute />
              </CurrenciesContext.Provider>
            </Route>
            <Route exact path="/sectors">
              <SectorsContext.Provider value={sectorsContext}>
                <SectorListRoute />
              </SectorsContext.Provider>
            </Route>
            <Route exact path="/add/sector">
              <SectorsContext.Provider value={sectorsContext}>
                <AddSectorRoute />
              </SectorsContext.Provider>
            </Route>

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
        </div>
      </div>
      {/* <Layout data-testid="home-route">
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
              <SettingsContext.Provider value={settingsContext}>
                <PortfoliosContext.Provider value={portfoliosContext}>
                  <PortfolioSelector />
                </PortfoliosContext.Provider>
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
            <Route exact path="/home">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <HomeRoute />
              </PortfoliosContext.Provider>
            </Route>
            <Route exact path="/settings">
              <SettingsContext.Provider value={settingsContext}>
                <SettingsRoute />
              </SettingsContext.Provider>
            </Route>
            <Route exact path="/add/portfolio">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <CurrenciesContext.Provider value={currenciesContext}>
                  <AddPortfolioRoute />
                </CurrenciesContext.Provider>
              </PortfoliosContext.Provider>
            </Route>
            <Route exact path="/add/currency">
              <CurrenciesContext.Provider value={currenciesContext}>
                <AddCurrencyRoute />
              </CurrenciesContext.Provider>
            </Route>
            <Route exact path="/add/market" component={AddMarketRoute} />
            <Route exact path="/markets" component={MarketListRoute} />
            <Route exact path="/currencies">
              <CurrenciesContext.Provider value={currenciesContext}>
                <CurrencyListRoute />
              </CurrenciesContext.Provider>
            </Route>
            <Route exact path="/sectors">
              <SectorsContext.Provider value={sectorsContext}>
                <SectorListRoute />
              </SectorsContext.Provider>
            </Route>
            <Route exact path="/add/sector">
              <SectorsContext.Provider value={sectorsContext}>
                <AddSectorRoute />
              </SectorsContext.Provider>
            </Route>

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
      </Layout> */}
    </>
  );
}

export default App;
