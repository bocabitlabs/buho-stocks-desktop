import React from "react";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

import { Layout } from "antd";

import TopNavbar from "./components/TopNavbar/TopNavbar";
import { useIsCollapsedContext } from "./hooks/is-collapsed";
import { IsCollapsedContext } from "./contexts/is-collapsed";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { useSelectedPortfolioContext } from "./hooks/selected-portfolio";
import { SelectedPortfolioContext } from "./contexts/selected-portfolio";
import CompanyAdd from "./pages/CompanyAdd/CompanyAdd";
import CurrencyAdd from "./pages/CurrencyAdd/CurrencyAdd";
import CurrencyList from "./pages/CurrencyList/CurrencyList";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import Home from "pages/Home/Home";
import DividendAdd from "pages/DividendAdd/DividendAdd";
import InflationAdd from "pages/InflationAdd/InflationAdd";
import InflationList from "pages/InflationList/InflationList";
import MarketAdd from "pages/MarketAdd/MarketAdd";
import MarketList from "pages/MarketList/MarketList";
import PortfolioAdd from "pages/PortfolioAdd/PortfolioAdd";
import PortfolioDetails from "pages/PortfolioDetails/PortfolioDetails";
import SectorAdd from "pages/SectorAdd/SectorAdd";
import SectorList from "pages/SectorList/SectorList";
import Settings from "pages/Settings/Settings";
import ShareAdd from "pages/ShareAdd/ShareAdd";

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
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/add/portfolio" component={PortfolioAdd} />
              <Route exact path="/add/currency" component={CurrencyAdd} />
              <Route exact path="/currencies" component={CurrencyList} />

              <Route exact path="/add/market" component={MarketAdd} />
              <Route exact path="/markets" component={MarketList} />
              <Route exact path="/add/inflation" component={InflationAdd} />
              <Route exact path="/inflations" component={InflationList} />

              <Route exact path="/sectors" component={SectorList} />
              <Route exact path="/add/sector" component={SectorAdd} />
              <Route
                exact
                path="/portfolios/:id"
                component={PortfolioDetails}
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
                component={ShareAdd}
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
