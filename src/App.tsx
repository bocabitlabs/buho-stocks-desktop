import React, { useState } from "react";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

import HomeRoute from "./routes/HomeRoute";
import { Layout } from "antd";

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
import { useCompaniesContext } from "./hooks/companies";
import { CompaniesContext } from "./contexts/companies";
import CompanyDetailsRoute from "./routes/CompanyDetailsRoute/CompanyDetailsRoute";
import AddShareRoute from "./routes/AddShareRoute/AddShareRoute";
import { useSharesContext } from "./hooks/shares";
import { SharesContext } from "./contexts/shares";

function App() {
  /**
   * Main
   */

  const settingsContext = useSettingsContext();
  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();
  const marketsContext = useMarketsContext();
  const companiesContext = useCompaniesContext();
  const sharesContext = useSharesContext();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div id="left" className="column">
        <div className="top-left"></div>
        <div className="bottom">
          <SettingsContext.Provider value={settingsContext}>
            <AppSidebar isCollapsed={isCollapsed} />
          </SettingsContext.Provider>
        </div>
      </div>
      <div id="right" className="column">
        <div className="top-right">
          <Layout.Header
            className="site-layout-background"
            style={{
              padding: 0,
              width: "100%"
            }}
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
        </div>
        <div className="bottom">
          <Layout.Content
            className="site-layout-background"
            style={{
              margin: "16px",
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

            <Route exact path="/portfolios/:id">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <PortfolioDetailsRoute />
              </PortfoliosContext.Provider>
            </Route>
            <Route exact path="/portfolios/:id/add-company">
              <PortfoliosContext.Provider value={portfoliosContext}>
                <SectorsContext.Provider value={sectorsContext}>
                  <CurrenciesContext.Provider value={currenciesContext}>
                    <MarketsContext.Provider value={marketsContext}>
                      <AddCompanyRoute />
                    </MarketsContext.Provider>
                  </CurrenciesContext.Provider>
                </SectorsContext.Provider>
              </PortfoliosContext.Provider>
            </Route>
            <CompaniesContext.Provider value={companiesContext}>
              <Route exact path="/portfolios/:portfolioId/companies/:companyId">
                <CompanyDetailsRoute />
              </Route>
            </CompaniesContext.Provider>
            <CompaniesContext.Provider value={companiesContext}>
              <SharesContext.Provider value={sharesContext}>
                <Route
                  exact
                  path="/portfolios/:portfolioId/companies/:companyId/add-shares"
                >
                  <AddShareRoute />
                </Route>
              </SharesContext.Provider>
            </CompaniesContext.Provider>
          </Layout.Content>
        </div>
      </div>
    </>
  );
}

export default App;
