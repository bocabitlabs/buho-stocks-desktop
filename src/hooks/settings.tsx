import { useState, useEffect } from "react";
import { SettingsContextType } from "contexts/settings";
import SettingsService from "services/settings-service";

import { SettingsItemProps } from "types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<SettingsItemProps | null>(null);

  useEffect(() => {
    const settings = SettingsService.getSettings();
    setSettings(settings);
  }, []);

  return {
    settings
  };
}
