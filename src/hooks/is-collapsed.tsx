import { useState, useEffect, useCallback } from "react";
import { IsCollapsedContextType } from "contexts/is-collapsed";
import SettingsService from "services/settings-service";

export function useIsCollapsedContext(): IsCollapsedContextType {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const result = SettingsService.getIsCollapsed();
    setIsCollapsed(result);
  }, [])

  const toggleCollapsed = useCallback(() => {
    const result = SettingsService.toggleCollapsed();
    console.log(result)
    if(result.changes){
      const result = SettingsService.getIsCollapsed();
      setIsCollapsed(result);
    }
  }, []);

  return {
    isCollapsed,
    toggleCollapsed
  };
}