import { Layout } from "antd";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import { useCompaniesContext } from "../../hooks/companies";
import CompanyDetailsContent from "./CompanyDetailsContent";
import CompanyDetailsRouteHeader from "./CompanyDetailsRouteHeader";

export interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRoute(): ReactElement {
  const { portfolioId, companyId } = useParams<Props>();
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <CompanyDetailsRouteHeader
        companyId={companyId}
        portfolioId={portfolioId}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CompanyDetailsContent
          companyId={companyId}
          portfolioId={portfolioId}
        />
      </Layout>
    </CompaniesContext.Provider>
  );
}
