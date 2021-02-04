import { Card, Statistic } from "antd";
import { CompaniesContext } from "contexts/companies";
import { useCompaniesContext } from "hooks/companies";
import React, { ReactElement } from "react";
import { IPortfolio } from "types/portfolio";
import PortfolioCardContent from "../PortfolioCardContent/PortfolioCardContent";

interface Props {
  portfolio: IPortfolio;
}

export default function PortfolioCard({ portfolio }: Props): ReactElement {
  const companiesContext = useCompaniesContext(portfolio.id);
  return (
    <CompaniesContext.Provider value={companiesContext}>
      <PortfolioCardContent portfolioId={portfolio.id} />
    </CompaniesContext.Provider>
  );
}
