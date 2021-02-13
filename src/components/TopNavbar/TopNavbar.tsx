import { SelectedPortfolioContext } from "contexts/selected-portfolio";
import { useSelectedPortfolioContext } from "hooks/selected-portfolio";
import React, { ReactElement } from "react";
import PortfolioSelectorMenu from "./components/PortfolioSelectorMenu/PortfolioSelectorMenu";

export default function TopNavbar(): ReactElement {
  return <PortfolioSelectorMenu />;
}
