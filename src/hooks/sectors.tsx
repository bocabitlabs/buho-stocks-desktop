import { useState, useEffect, useCallback } from "react";
import { SectorsContextType } from "contexts/sectors";
import SectorService from "services/sector-service";
import { Sector, SectorFormFields } from "types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sector, setSector] = useState<Sector|null>(null);
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
      return results;
    },
    []
  );

  const getById = useCallback((id: string) => {
    setIsLoading(true);
    const result = SectorService.getById(id);
    setSector(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((id: string, sector: SectorFormFields) => {
    setIsLoading(true);
    const result = SectorService.update(id, sector);
    setIsLoading(false);
    return result;
  }, []);

  return {
    sector,
    sectors,
    isLoading,
    fetchSectors,
    addSector,
    getById,
    update
  };
}
