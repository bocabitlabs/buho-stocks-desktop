import { useState, useEffect, useCallback } from "react";
import { SectorsContextType } from "contexts/sectors";
import SectorService from "services/sector-service";
import { SectorFields, SectorItemProps } from "types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sectors, setSectors] = useState<SectorFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = SectorService.getSectors();
    setSectors(results);
  }, []);

  const fetchSectors = useCallback(() => {
    setIsLoading(true);
    const results = SectorService.getSectors();
    setSectors(results);
  }, []);

  const addSector = useCallback(
    (sector: SectorItemProps) => {
      setIsLoading(true);
      const results = SectorService.getSectors();
      setSectors(results);
    },
    []
  );

  return {
    sectors,
    isLoading,
    fetchSectors,
    addSector
  };
}
