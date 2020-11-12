import { useState, useEffect } from "react";
import { SectorsContextType } from "../contexts/sectors";
import SectorService from "../services/sector-service";
import { SectorFields } from "../types/sector";

export function useSectorsContext(): SectorsContextType {
  const [sectors, setSectors] = useState<SectorFields[]>([]);

  useEffect(() => {
    const results = new SectorService().getSectors();
    setSectors(results);
  }, []);

  return {
    sectors
  };
}
