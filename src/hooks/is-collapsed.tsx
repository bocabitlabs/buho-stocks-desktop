import { useState, useCallback } from "react";
import { IsCollapsedContextType } from "../contexts/settings";
import SettingsService from "../services/settings-service";

export function useIsCollapsedContext(): IsCollapsedContextType {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const fetchIsCollapsed = useCallback(() => {
    const result = new SettingsService().getIsCollapsed();
    setIsCollapsed(result);
  }, []);

  const toggleCollapsed = useCallback(() => {
    return new SettingsService().toggleCollapsed();
  }, []);

  return {
    isCollapsed,
    fetchIsCollapsed,
    toggleCollapsed
  };
}