import { Layout } from "antd";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { useCompaniesContext } from "hooks/companies";
import CompanyDetailsContent from "./components/CompanyDetailsContent/CompanyDetailsContent";
import CompanyDetailsHeader from "./components/CompanyDetailsHeader/CompanyDetailsHeader";
import { SharesContext } from "contexts/shares";
import { useSharesContext } from "hooks/shares";
import { useDividendsContext } from "hooks/dividends";
import { DividendsContext } from "contexts/dividends";

export interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetails(): ReactElement {
  const { portfolioId, companyId } = useParams<Props>();
  const companiesContext = useCompaniesContext(companyId);
  const sharesContext = useSharesContext(companyId);
  const dividendsContext = useDividendsContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <CompanyDetailsHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesContext.Provider value={sharesContext}>
          <DividendsContext.Provider value={dividendsContext}>
            <CompanyDetailsContent
              companyId={companyId}
              portfolioId={portfolioId}
            />
          </DividendsContext.Provider>
        </SharesContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
}
