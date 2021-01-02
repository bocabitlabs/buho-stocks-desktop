import React, { ReactElement } from "react";
import { PortfoliosContext } from "../../contexts/portfolios";
import { usePortfoliosContext } from "../../hooks/portfolios";
import PortfolioSelectorMenu from "./components/PortfolioSelectorMenu/PortfolioSelectorMenu";

export default function TopNavbar(): ReactElement {
  const portfoliosContext = usePortfoliosContext();
  return (
    <PortfoliosContext.Provider value={portfoliosContext}>
      <PortfolioSelectorMenu />
    </PortfoliosContext.Provider>
  );
}
