import { createContext } from "react";
import { SectorFields, SectorItemProps } from "../types/sector";

export type SectorsContextType = {
  sectors: SectorFields[];
  isLoading: boolean;
  fetchSectors: () => void;
  addSector: (sector: SectorItemProps) => void;
};

export const sectorsDefaultValue: SectorsContextType = {
  sectors: [],
  isLoading: false,
  fetchSectors: () => null,
  addSector: () => null
}

export const SectorsContext = createContext<SectorsContextType>(sectorsDefaultValue);