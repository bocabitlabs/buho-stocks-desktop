import { useState, useCallback } from "react";
import { SettingsContextType } from "../contexts/settings";
import {
  getSettings as getSettingsDAO,
  updateSelectedPortfolio as updateSelectedPortfolioDAO,
  toggleCollapsed as updateCollapsedDAO
} from "../daos/settings-dao";
import { SettingsItemProps } from "../types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<SettingsItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = useCallback(() => {
    setIsLoading(true);
    getSettingsDAO(getSettingCallback);
  }, []);

  const getSettingCallback = (result: SettingsItemProps[]) => {
    setSettings(result);
    console.log(result);
    setIsLoading(false);
  };

  const updateSelectedPortfolio = useCallback((selectedPortfolio: string) => {
    setIsLoading(true);
    updateSelectedPortfolioDAO(selectedPortfolio, updateSettingsCallback);
  }, []);

  const updateSettingsCallback = (result: SettingsItemProps[]) => {
    console.log(result);
    setIsLoading(false);
  };

  const toggleCollapsed = useCallback(() => {
    setIsLoading(true);
    updateCollapsedDAO(updateSettingsCallback);
  }, []);

  return {
    settings,
    isLoading,
    fetchSettings,
    updateSelectedPortfolio,
    toggleCollapsed
  };
}
