import { useState, useEffect, useCallback } from "react";
import { SettingsContextType } from "contexts/settings";
import SettingsService from "services/settings/settings-service";

import { ISettings } from "types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = () => {
    setIsLoading(true);
    const settings = SettingsService.getSettings();
    setSettings(settings);
    setIsLoading(false);
    return settings;
  }

  const updateDatabasePath = (newPath: string) => {
    console.debug("Calling updateDatabasePath on hook");
    setIsLoading(true);
    const result = SettingsService.updateDatabasePath(newPath);
    setIsLoading(false);
    return result;
  };

  const toggleCollapsed = useCallback(() => {
    const result = SettingsService.toggleCollapsed();
    if(result.changes){
      getSettings();
    }
  }, []);


  const setDefaultCompanyDisplayMode = useCallback((value: string) => {
    const result = SettingsService.setDefaultCompanyDisplayMode(value);
    if(result.changes){
      getSettings();
    }
  }, []);

  return {
    settings,
    isLoading,
    getSettings,
    updateDatabasePath,
    toggleCollapsed,
    setDefaultCompanyDisplayMode
  };
}
