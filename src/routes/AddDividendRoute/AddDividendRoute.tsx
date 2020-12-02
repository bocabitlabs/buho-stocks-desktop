import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import AddDividendRouteHeader from "./AddDividendRouteHeader";
import { useDividendsContext } from "../../hooks/dividends";
import { DividendsContext } from "../../contexts/dividends";
import AddDividendForm from "../../components/AddDividendForm/AddDividendForm";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const AddDividendRoute = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const dividendsContext = useDividendsContext(companyId);
  const companyContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companyContext}>
      <AddDividendRouteHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <DividendsContext.Provider value={dividendsContext}>
          <AddDividendForm companyId={companyId} />
        </DividendsContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default AddDividendRoute;
