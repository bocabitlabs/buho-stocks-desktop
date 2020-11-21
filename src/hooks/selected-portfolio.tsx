import { useState, useEffect } from "react";
import { SelectedPortfolioContextType } from "../contexts/selected-portfolio";
import SettingsService from "../services/settings-service";

export function useSelectedPortfolioContext(): SelectedPortfolioContextType {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");

  useEffect(() => {
    const result = new SettingsService().getSelectedPortfolio();
    setSelectedPortfolio(result);
  }, []);

  return {
    selectedPortfolio
  };
}
