import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useCompaniesContext } from "hooks/companies";
import { CompaniesContext } from "contexts/companies";
import { useRightsTransactionsContext } from "hooks/rights-transactions";
import { RightsTransactionContext } from "contexts/rights-transactions";
import RightsTransactionEditHeader from "./components/RightsTransactionEditHeader/RightsTransactionEditHeader";
import RightsTransactionAddForm from "components/RightsTransactionAddForm/RightsTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
  transactionId: string;
}

const RightsTransactionEdit = () => {
  const { portfolioId, companyId, transactionId } = useParams<Props>();
  const rightsTransactionContext = useRightsTransactionsContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <RightsTransactionContext.Provider value={rightsTransactionContext}>
        <RightsTransactionEditHeader
          companyId={companyId}
          portfolioId={portfolioId}
          transactionId={transactionId}
        />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <RightsTransactionAddForm
            companyId={companyId}
            transactionId={transactionId}
          />
        </Layout>
      </RightsTransactionContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default RightsTransactionEdit;
