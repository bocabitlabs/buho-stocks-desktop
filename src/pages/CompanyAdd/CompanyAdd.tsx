import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import { useCompaniesContext } from "../../hooks/companies/use-companies-context";
import CompanyAddHeader from "./components/CompanyAddHeader/CompanyAddHeader";
import { useCurrenciesContext } from "../../hooks/currencies";
import { useSectorsContext } from "../../hooks/sectors/use-sectors-context";
import { useMarketsContext } from "../../hooks/markets";
import { SectorsContext } from "../../contexts/sectors";
import { CurrenciesContext } from "../../contexts/currencies";
import { MarketsContext } from "../../contexts/markets";
import CompanyAddEditForm from "components/CompanyAddEditForm/CompanyAddEditForm";

export interface IAddCompanyRouteParams {
  id: string;
}

const CompanyAdd = () => {
  const { id } = useParams<IAddCompanyRouteParams>();
  const companiesContext = useCompaniesContext(id);

  const currenciesContext = useCurrenciesContext();
  const sectorsContext = useSectorsContext();
  const marketsContext = useMarketsContext();

  return (
    <SectorsContext.Provider value={sectorsContext}>
      <CurrenciesContext.Provider value={currenciesContext}>
        <MarketsContext.Provider value={marketsContext}>
            <CompanyAddHeader portfolioId={id} />
            <CompaniesContext.Provider value={companiesContext}>
              <Layout
                style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}
              >
                <CompanyAddEditForm portfolioId={id} />
              </Layout>
            </CompaniesContext.Provider>
        </MarketsContext.Provider>
      </CurrenciesContext.Provider>
    </SectorsContext.Provider>
  );
};

export default CompanyAdd;
