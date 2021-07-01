import React from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import { useDividendsTransactionsContext } from "hooks/dividends-transactions/use-dividends-transactions-context";
import { useCompaniesContext } from "hooks/companies/use-companies-context";

import DividendsTransactionAddHeader from "./components/DividendsTransactionAddHeader/DividendsTransactionAddHeader";
import DividendsTransactionAddForm from "components/DividendsTransactionAddForm/DividendsTransactionAddForm";
import { useExchangeRatesContext } from "hooks/exchange-rates/use-exchange-rates-context";
import { ExchangeRatesContext } from "contexts/exchange-rates";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const DividendsTransactionAdd = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const dividendsContext = useDividendsTransactionsContext(companyId);
  const exchangeRatesContext = useExchangeRatesContext();
  const companyContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companyContext}>
      <DividendsTransactionsContext.Provider value={dividendsContext}>
        <ExchangeRatesContext.Provider value={exchangeRatesContext}>
          <DividendsTransactionAddHeader
            companyId={companyId}
            portfolioId={portfolioId}
          />
          <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
            <DividendsTransactionAddForm companyId={companyId} />
          </Layout>
        </ExchangeRatesContext.Provider>
      </DividendsTransactionsContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default DividendsTransactionAdd;
