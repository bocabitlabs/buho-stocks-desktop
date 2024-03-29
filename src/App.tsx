import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import TopNavbar from "./components/TopNavbar/TopNavbar";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import { useSelectedPortfolioContext } from "./hooks/selected-portfolio/use-selected-portfolio-context";
import { SelectedPortfolioContext } from "./contexts/selected-portfolio";
import CompanyAdd from "./pages/CompanyAdd/CompanyAdd";
import CurrencyAdd from "./pages/CurrencyAdd/CurrencyAdd";
import CurrencyList from "./pages/CurrencyList/CurrencyList";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import Home from "pages/Home/Home";
import MarketAdd from "pages/MarketAdd/MarketAdd";
import MarketList from "pages/MarketList/MarketList";
import PortfolioAdd from "pages/PortfolioAdd/PortfolioAdd";
import PortfolioDetails from "pages/PortfolioDetails/PortfolioDetails";
import SectorAdd from "pages/SectorAdd/SectorAdd";
import SectorList from "pages/SectorList/SectorList";
import Settings from "pages/Settings/Settings";
import RightsTransactionAdd from "pages/RightsTransactionAdd/RightsTransactionAdd";
import SharesTransactionAdd from "pages/SharesTransactionAdd/SharesTransactionAdd";
import DividendsTransactionAdd from "pages/DividendsTransactionAdd/DividendsTransactionAdd";
import DividendsTransactionEdit from "pages/DividendsTransactionEdit/DividendsTransactionEdit";
import SharesTransactionEdit from "pages/SharesTransactionEdit/SharesTransactionEdit";
import RightsTransactionEdit from "pages/RightsTransactionEdit/RightsTransactionEdit";
import CsvImport from "pages/broker-csv-import/broker-csv-import";
import { usePortfoliosContext } from "hooks/portfolios/use-portfolios-context";
import { PortfoliosContext } from "contexts/portfolios";
import ImportExport from "pages/ImportExport/ImportExport";
import ExportAppData from "pages/ExportAppData/ExportAppData";
import Import from "pages/ImportData/Import";
import ImportAppData from "pages/ImportAppData/ImportAppData";
import CompanyEdit from "pages/CompanyEdit/CompanyEdit";
import PortfolioTransactionsLogList from "pages/PortfolioTransactionsLogList/PortfolioTransactionsLogList";
import ScrollToTop from "components/ScrollToTop/scroll-to-top";
import CurrencyEdit from "pages/CurrencyEdit/CurrencyEdit";
import SectorEdit from "pages/SectorEdit/SectorEdit";
import MarketEdit from "pages/MarketEdit/MarketEdit";
import PortfolioEdit from "pages/PortfolioEdit/PortfolioEdit";
import { useSettingsContext } from "hooks/settings/use-settings-context";
import { SettingsContext } from "contexts/settings";
import PortfolioCharts from "pages/PortfolioCharts/PortfolioCharts";
import SettingsService from "services/settings/settings-service";
import { useTranslation } from "react-i18next";

function App() {
  /**
   * Main
   */
  const settingsContext = useSettingsContext();
  const selectedPortfolioContext = useSelectedPortfolioContext();
  const portfoliosContext = usePortfoliosContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    const settings = SettingsService.getSettings()
    i18n.changeLanguage(settings.language);
  }, [i18n])


  return (
    <Layout>
      <SettingsContext.Provider value={settingsContext}>
        <PortfoliosContext.Provider value={portfoliosContext}>
          <SelectedPortfolioContext.Provider value={selectedPortfolioContext}>
            <AppSidebar />
            <ScrollToTop />
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
                id="mainDiv"
                className="site-layout-background"
                style={{
                  margin: "74px 0 10px 10px",
                  overflowY: "auto"
                }}
              >
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/import-export" component={ImportExport} />
                  <Route exact path="/export" component={ExportAppData} />
                  <Route exact path="/import" component={Import} />
                  <Route
                    exact
                    path="/import/app-data"
                    component={ImportAppData}
                  />
                  <Route exact path="/import/broker" component={CsvImport} />

                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/add/portfolio" component={PortfolioAdd} />
                  <Route exact path="/add/currency" component={CurrencyAdd} />
                  <Route exact path="/currencies" component={CurrencyList} />
                  <Route
                    exact
                    path="/currencies/:currencyId/edit/"
                    component={CurrencyEdit}
                  />
                  <Route exact path="/add/market" component={MarketAdd} />
                  <Route exact path="/markets" component={MarketList} />
                  <Route
                    exact
                    path="/markets/:marketId/edit/"
                    component={MarketEdit}
                  />

                  <Route exact path="/sectors" component={SectorList} />
                  <Route exact path="/add/sector" component={SectorAdd} />
                  <Route
                    exact
                    path="/sectors/:sectorId/edit/"
                    component={SectorEdit}
                  />
                  <Route
                    exact
                    path="/portfolios/:id"
                    component={PortfolioDetails}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/charts"
                    component={PortfolioCharts}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/edit/"
                    component={PortfolioEdit}
                  />
                  <Route
                    exact
                    path="/portfolios/:id/companies/add"
                    component={CompanyAdd}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId"
                    component={CompanyDetails}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/edit"
                    component={CompanyEdit}
                  />
                  <Route
                    exact
                    path="/portfolios/:id/log"
                    component={PortfolioTransactionsLogList}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/add-shares"
                    component={SharesTransactionAdd}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/shares/:transactionId/edit/"
                    component={SharesTransactionEdit}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/add-dividends"
                    component={DividendsTransactionAdd}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/dividends/:transactionId/edit/"
                    component={DividendsTransactionEdit}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/add-rights-transaction"
                    component={RightsTransactionAdd}
                  />
                  <Route
                    exact
                    path="/portfolios/:portfolioId/companies/:companyId/rights/:transactionId/edit/"
                    component={RightsTransactionEdit}
                  />
                </Switch>
              </Layout.Content>
            </Layout>
          </SelectedPortfolioContext.Provider>
        </PortfoliosContext.Provider>
      </SettingsContext.Provider>
    </Layout>
  );
}

export default App;
