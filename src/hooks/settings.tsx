import { useState, useCallback } from "react";
import { SettingsContextType } from "../contexts/settings";
import SettingsService from "../services/settings-service";

import { SettingsItemProps } from "../types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<SettingsItemProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = useCallback(() => {
    setIsLoading(true);
    new SettingsService().getSettings(getSettingCallback);
  }, []);

  const getSettingCallback = (result: SettingsItemProps) => {
    setSettings(result);
    console.log(result);
    setIsLoading(false);
  };

  const updateSelectedPortfolio = useCallback((selectedPortfolio: string) => {
    setIsLoading(true);
    new SettingsService().updateSelectedPortfolio(
      selectedPortfolio,
      updateSettingsCallback
    );
  }, []);

  const updateSettingsCallback = (result: SettingsItemProps[]) => {
    console.log(result);
    setIsLoading(false);
  };

  const toggleCollapsed = useCallback(() => {
    setIsLoading(true);
    new SettingsService().toggleCollapsed(updateSettingsCallback);
  }, []);

  return {
    settings,
    isLoading,
    fetchSettings,
    updateSelectedPortfolio,
    toggleCollapsed
  };
}
