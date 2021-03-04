import { useState, useEffect } from "react";
import { SettingsContextType } from "contexts/settings";
import SettingsService from "services/settings-service";

import { ISettings } from "types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const settings = SettingsService.getSettings();
    setSettings(settings);
    setIsLoading(false);
  }, []);

  const updateDatabasePath = (newPath: string) => {
    console.debug("Calling updateDatabasePath on hook");
    setIsLoading(true);
    const result = SettingsService.updateDatabasePath(newPath);
    setIsLoading(false);
    return result;
  };

  return {
    settings,
    isLoading,
    updateDatabasePath
  };
}
