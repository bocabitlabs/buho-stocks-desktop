import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import RightsTransactionAddHeader from "./components/RightsTransactionAddHeader/RightsTransactionAddHeader";
import { useRightsTransactionsContext } from "hooks/rights-transactions";
import { RightsTransactionContext } from "contexts/rights-transactions";
import RightsTransactionAddForm from "components/RightsTransactionAddForm/RightsTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const RightsTransactionAdd = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const rightsTransactionContext = useRightsTransactionsContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <RightsTransactionContext.Provider value={rightsTransactionContext}>
        <RightsTransactionAddHeader
          companyId={companyId}
          portfolioId={portfolioId}
        />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <RightsTransactionAddForm companyId={companyId} />
        </Layout>
      </RightsTransactionContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default RightsTransactionAdd;
