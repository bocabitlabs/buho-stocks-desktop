import { useState, useEffect, useCallback } from "react";
import { SectorsContextType } from "contexts/sectors";
import SectorService from "services/sector-service";
import { ISector, SectorFormFields } from "types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sector, setSector] = useState<ISector|null>(null);
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = SectorService.getAll();
    setSectors(results);
  }, []);

  const fetchSectors = useCallback(() => {
    setIsLoading(true);
    const results = SectorService.getAll();
    setSectors(results);
    return results;
  }, []);

  const create = useCallback(
    (sector: SectorFormFields) => {
      setIsLoading(true);
      const results = SectorService.create(sector);
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
    create,
    getById,
    update
  };
}
