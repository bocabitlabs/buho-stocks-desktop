import { useState, useCallback } from "react";
import { SettingsContextType } from "../contexts/settings";
import SettingsService from "../services/settings-service";

import { SettingsItemProps } from "../types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<SettingsItemProps | null>(null);

  const fetchSettings = useCallback(() => {
    const settings = new SettingsService().getSettings();
    setSettings(settings);
  }, []);

  const updateSelectedPortfolio = useCallback((selectedPortfolio: string) => {
    new SettingsService().updateSelectedPortfolio(selectedPortfolio);
  }, []);

  return {
    settings,
    fetchSettings,
    updateSelectedPortfolio
  };
}
