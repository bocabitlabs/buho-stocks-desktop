import React from "react";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

import { Layout } from "antd";

import PortfolioDetailsRoute from "./routes/PortfolioDetailsRoute/PortfolioDetailsRoute";
import MarketListRoute from "./routes/MarketListRoute/MarketListRoute";
import SettingsRoute from "./routes/SettingsRoute/SettingsRoute";
import SectorListRoute from "./routes/SectorListRoute/SectorListRoute";

import TopNavbar from "./components/TopNavbar/TopNavbar";
import { useIsCollapsedContext } from "./hooks/is-collapsed";
import { IsCollapsedContext } from "./contexts/is-collapsed";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { useSelectedPortfolioContext } from "./hooks/selected-portfolio";
import { SelectedPortfolioContext } from "./contexts/selected-portfolio";
import CompanyAdd from "./routes/CompanyAdd/CompanyAdd";
import PortfolioAddRoute from "./routes/PortfolioAddRoute/PortfolioAddRoute";
import CurrencyAdd from "./routes/CurrencyAdd/CurrencyAdd";
import SectorAddRoute from "./routes/SectorAddRoute/SectorAddRoute";
import ShareAddRoute from "./routes/ShareAddRoute/ShareAddRoute";
import CurrencyList from "./routes/CurrencyList/CurrencyList";
import CompanyDetails from "./routes/CompanyDetails/CompanyDetails";
import Home from "routes/Home/Home";
import DividendAdd from "routes/DividendAdd/DividendAdd";
import InflationAdd from "routes/InflationAdd/InflationAdd";
import InflationList from "routes/InflationList/InflationList";
import MarketAdd from "routes/MarketAdd/MarketAdd";

function App() {
  /**
   * Main
   */
  console.log("App Rendered");
  const isCollapsedContext = useIsCollapsedContext();
  const selectedPortfolioContext = useSelectedPortfolioContext();

  return (
    <Layout>
      <IsCollapsedContext.Provider value={isCollapsedContext}>
        <SelectedPortfolioContext.Provider value={selectedPortfolioContext}>
          <AppSidebar />

          <Layout>
            <Layout.Header
              className="site-layout-background"
              style={{
                padding: 0,
                position: "fixed",
                zIndex: 1,
                width: "100%"
              }}
            >
              <TopNavbar />
            </Layout.Header>

            <Layout.Content
              className="site-layout-background"
              style={{
                margin: "16px",
                marginTop: 80
              }}
            >
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/home" />;
                }}
              />
              <Route exact path="/home" component={Home} />
              <Route exact path="/settings" component={SettingsRoute} />
              <Route
                exact
                path="/add/portfolio"
                component={PortfolioAddRoute}
              />
              <Route exact path="/add/currency" component={CurrencyAdd} />
              <Route exact path="/currencies" component={CurrencyList} />

              <Route exact path="/add/market" component={MarketAdd} />
              <Route exact path="/markets" component={MarketListRoute} />
              <Route exact path="/add/inflation" component={InflationAdd} />
              <Route exact path="/inflations" component={InflationList} />

              <Route exact path="/sectors" component={SectorListRoute} />
              <Route exact path="/add/sector" component={SectorAddRoute} />
              <Route
                exact
                path="/portfolios/:id"
                component={PortfolioDetailsRoute}
              />
              <Route
                exact
                path="/portfolios/:id/add-company"
                component={CompanyAdd}
              />
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId"
                component={CompanyDetails}
              />
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId/add-shares"
                component={ShareAddRoute}
              />
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId/add-dividends"
                component={DividendAdd}
              />
            </Layout.Content>
          </Layout>
        </SelectedPortfolioContext.Provider>
      </IsCollapsedContext.Provider>
    </Layout>
  );
}

export default App;
