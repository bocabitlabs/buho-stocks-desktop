import { createContext } from "react";
import { Sector, SectorFormFields } from "types/sector";

export type SectorsContextType = {
  sectors: Sector[];
  isLoading: boolean;
  fetchSectors: () => void;
  addSector: (sector: SectorFormFields) => void;
};

export const sectorsDefaultValue: SectorsContextType = {
  sectors: [],
  isLoading: false,
  fetchSectors: () => null,
  addSector: () => null
};

export const SectorsContext = createContext<SectorsContextType>(
  sectorsDefaultValue
);
