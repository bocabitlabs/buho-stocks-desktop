import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import { useCompaniesContext } from "../../hooks/companies";
import AddCompanyRouteHeader from "./CompanyAddRouteHeader";
import { useCurrenciesContext } from "../../hooks/currencies";
import { useSectorsContext } from "../../hooks/sectors";
import { useMarketsContext } from "../../hooks/markets";
import { SectorsContext } from "../../contexts/sectors";
import { CurrenciesContext } from "../../contexts/currencies";
import { MarketsContext } from "../../contexts/markets";
import { usePortfoliosContext } from "../../hooks/portfolios";
import { PortfoliosContext } from "../../contexts/portfolios";
import CompanyAddForm from "../../components/CompanyAddForm/CompanyAddForm";

export interface IAddCompanyRouteParams {
  id: string;
}


const CompanyAddRoute = () => {
  const { id } = useParams<IAddCompanyRouteParams>();
  const companiesContext = useCompaniesContext(id);
  const portfoliosContext = usePortfoliosContext();

  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();
  const marketsContext = useMarketsContext();

  return (
    <SectorsContext.Provider value={sectorsContext}>
      <CurrenciesContext.Provider value={currenciesContext}>
        <MarketsContext.Provider value={marketsContext}>
          <PortfoliosContext.Provider value={portfoliosContext}>
            <AddCompanyRouteHeader portfolioId={id} />
            <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
              <CompaniesContext.Provider value={companiesContext}>
                <CompanyAddForm portfolioID={id} />
              </CompaniesContext.Provider>
            </Layout>
          </PortfoliosContext.Provider>
        </MarketsContext.Provider>
      </CurrenciesContext.Provider>
    </SectorsContext.Provider>
  );
};

export default CompanyAddRoute;