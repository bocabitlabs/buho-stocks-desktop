import { useState, useCallback } from "react";
import { SectorsContextType } from "../contexts/sectors";
import {
  getSectors,
  addSector as addSectorDAO
} from "../daos/sector-dao";
import { SectorFields, SectorItemProps } from "../types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sectors, setSectors] = useState<SectorFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSectors = useCallback(() => {
    setIsLoading(true);
    getSectors(getCallback);
  }, []);

  const getCallback = (result: SectorFields[]) => {
    setSectors(result);
    setIsLoading(false);
  };

  const addSector = useCallback(
    (sector: SectorItemProps) => {
      const addCallback = (result: []) => {
        fetchSectors();
        console.log(result);
        setIsLoading(false);
      };

      setIsLoading(true);
      addSectorDAO(sector, addCallback);
    },
    [fetchSectors]
  );

  return {
    sectors,
    isLoading,
    fetchSectors,
    addSector
  };
}
