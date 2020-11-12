import React, { useState } from "react";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout } from "antd";

import PortfolioDetailsRoute from "./routes/PortfolioDetailsRoute/PortfolioDetailsRoute";
import AddPortfolioRoute from "./routes/AddPortfolioRoute";
import AddCurrencyRoute from "./routes/AddCurrencyRoute/AddCurrencyRoute";
import AddCompanyRoute from "./routes/AddCompanyRoute/AddCompanyRoute";
import AddMarketRoute from "./routes/AddMarketRoute";
import MarketListRoute from "./routes/MarketListRoute/MarketListRoute";
import SettingsRoute from "./routes/SettingsRoute/SettingsRoute";
import CurrencyListRoute from "./routes/CurrencyListRoute";
import SectorListRoute from "./routes/SectorListRoute/SectorListRoute";
import AddSectorRoute from "./routes/AddSectorRoute/AddSectorRoute";
import { SettingsContext } from "./contexts/settings";
import { useSettingsContext } from "./hooks/settings";
import { PortfoliosContext } from "./contexts/portfolios";
import { usePortfoliosContext } from "./hooks/portfolios";
import { useCurrenciesContext } from "./hooks/currencies";
import { CurrenciesContext } from "./contexts/currencies";
import { useSectorsContext } from "./hooks/sectors";
import { SectorsContext } from "./contexts/sectors";
import PortfolioSelectorMenu from "./components/PortfolioSelectorMenu/PortfolioSelectorMenu";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { useMarketsContext } from "./hooks/markets";
import { MarketsContext } from "./contexts/markets";
import CompanyDetailsRoute from "./routes/CompanyDetailsRoute/CompanyDetailsRoute";
import AddShareRoute from "./routes/AddShareRoute/AddShareRoute";
import AlertMessage from "./components/AlertMessage/AlertMessage";

function App() {
  /**
   * Main
   */

  const settingsContext = useSettingsContext();

  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log("App Rendered");
  return (
    <Layout>
      <AppSidebar isCollapsed={isCollapsed} />

      <Layout>
        <Layout.Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed", zIndex: 1, width: "100%" }}
        >
          <SettingsContext.Provider value={settingsContext}>
            <PortfoliosContext.Provider value={portfoliosContext}>
              <PortfolioSelectorMenu
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            </PortfoliosContext.Provider>
          </SettingsContext.Provider>
        </Layout.Header>
        <AlertMessage />

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
          <Route exact path="/add/portfolio" component={AddPortfolioRoute} />
          <Route exact path="/add/currency" component={AddCurrencyRoute} />
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
          <Route exact path="/portfolios/:id/add-company" component={AddCompanyRoute}/>
          <Route exact path="/portfolios/:portfolioId/companies/:companyId">
            <CompanyDetailsRoute />
          </Route>
          <Route
            exact
            path="/portfolios/:portfolioId/companies/:companyId/add-shares"
          >
            <AddShareRoute />
          </Route>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
