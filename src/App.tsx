import React from "react";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute/HomeRoute";
import { Layout } from "antd";

import PortfolioDetailsRoute from "./routes/PortfolioDetailsRoute/PortfolioDetailsRoute";
import AddPortfolioRoute from "./routes/AddPortfolioRoute/AddPortfolioRoute";
import AddCurrencyRoute from "./routes/AddCurrencyRoute/AddCurrencyRoute";
import AddCompanyRoute from "./routes/AddCompanyRoute/AddCompanyRoute";
import AddMarketRoute from "./routes/AddMarketRoute/AddMarketRoute";
import MarketListRoute from "./routes/MarketListRoute/MarketListRoute";
import SettingsRoute from "./routes/SettingsRoute/SettingsRoute";
import CurrencyListRoute from "./routes/CurrencyListRoute/CurrencyListRoute";
import SectorListRoute from "./routes/SectorListRoute/SectorListRoute";
import AddSectorRoute from "./routes/AddSectorRoute/AddSectorRoute";

import CompanyDetailsRoute from "./routes/CompanyDetailsRoute/CompanyDetailsRoute";
import AddShareRoute from "./routes/AddShareRoute/AddShareRoute";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import { useIsCollapsedContext } from "./hooks/is-collapsed";
import { IsCollapsedContext } from "./contexts/is-collapsed";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { useSelectedPortfolioContext } from "./hooks/selected-portfolio";
import { SelectedPortfolioContext } from "./contexts/selected-portfolio";
import AddDividendRoute from "./routes/AddDividendRoute/AddDividendRoute";

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
              <Route exact path="/home" component={HomeRoute} />
              <Route exact path="/settings" component={SettingsRoute} />
              <Route
                exact
                path="/add/portfolio"
                component={AddPortfolioRoute}
              />
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
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId"
                component={CompanyDetailsRoute}
              />
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId/add-shares"
                component={AddShareRoute}
              />
              <Route
                exact
                path="/portfolios/:portfolioId/companies/:companyId/add-dividends"
                component={AddDividendRoute}
              />
            </Layout.Content>
          </Layout>
        </SelectedPortfolioContext.Provider>
      </IsCollapsedContext.Provider>
    </Layout>
  );
}

export default App;
