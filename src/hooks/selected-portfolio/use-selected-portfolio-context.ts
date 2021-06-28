import { useState, useEffect, useCallback } from "react";
import { SelectedPortfolioContextType } from "contexts/selected-portfolio";
import SettingsService from "services/settings/settings-service";

export function useSelectedPortfolioContext(): SelectedPortfolioContextType {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");

  useEffect(() => {
    const result = SettingsService.getSelectedPortfolio();
    setSelectedPortfolio(result);
  }, []);

  const update = useCallback((selectedPortfolio: string) => {
    const result = SettingsService.updateSelectedPortfolio(selectedPortfolio);
    const newValue = SettingsService.getSelectedPortfolio();
    setSelectedPortfolio(newValue);
    return result;
  }, []);

  return {
    selectedPortfolio,
    update
  };
}
