import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { useCompaniesContext } from "hooks/companies";
import { useCurrenciesContext } from "hooks/currencies";
import { useSectorsContext } from "hooks/sectors/use-sectors-context";
import { useMarketsContext } from "hooks/markets";
import { SectorsContext } from "contexts/sectors";
import { CurrenciesContext } from "contexts/currencies";
import { MarketsContext } from "contexts/markets";
import CompanyAddEditForm from "components/CompanyAddEditForm/CompanyAddEditForm";
import CompanyEditHeader from "./components/CompanyEditHeader/CompanyEditHeader";

export interface IRouteParams {
  portfolioId: string;
  companyId: string;
}

const CompanyEdit = () => {
  const { portfolioId, companyId } = useParams<IRouteParams>();
  const companiesContext = useCompaniesContext(portfolioId);
  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();
  const marketsContext = useMarketsContext();

  return (
    <SectorsContext.Provider value={sectorsContext}>
      <CurrenciesContext.Provider value={currenciesContext}>
        <MarketsContext.Provider value={marketsContext}>
          <CompaniesContext.Provider value={companiesContext}>
            <CompanyEditHeader
              portfolioId={portfolioId}
              companyId={companyId}
            />
            <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
              <CompanyAddEditForm portfolioId={portfolioId} companyId={companyId} />
            </Layout>
          </CompaniesContext.Provider>
        </MarketsContext.Provider>
      </CurrenciesContext.Provider>
    </SectorsContext.Provider>
  );
};

export default CompanyEdit;
