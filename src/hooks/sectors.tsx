import { useState, useEffect, useCallback } from "react";
import { SectorsContextType } from "contexts/sectors";
import SectorService from "services/sector-service";
import { Sector, SectorFormFields } from "types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sectors, setSectors] = useState<Sector[]>([]);
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
    (sector: SectorFormFields) => {
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
