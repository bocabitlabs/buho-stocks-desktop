import { Layout } from "antd";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { useCompaniesContext } from "hooks/companies";
import CompanyDetailsContent from "./components/CompanyDetailsContent/CompanyDetailsContent";
import CompanyDetailsHeader from "./components/CompanyDetailsHeader/CompanyDetailsHeader";
import { useSharesTransactionsContext } from "hooks/shares-transactions";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import { useDividendsTransactionsContext } from "hooks/dividends-transactions";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";

export interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetails(): ReactElement {
  const { portfolioId, companyId } = useParams<Props>();
  const companiesContext = useCompaniesContext(companyId);
  const sharesContext = useSharesTransactionsContext(companyId);
  const dividendsTransactionsContext = useDividendsTransactionsContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <CompanyDetailsHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesTransactionsContext.Provider value={sharesContext}>
          <DividendsTransactionsContext.Provider value={dividendsTransactionsContext}>
            <CompanyDetailsContent
              companyId={companyId}
              portfolioId={portfolioId}
            />
          </DividendsTransactionsContext.Provider>
        </SharesTransactionsContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
}
