import { createContext } from "react";
import { SectorFields } from "../types/sector";

export type SectorsContextType = {
  sectors: SectorFields[];
  fetchSectors: () => void;
};

export const sectorsDefaultValue: SectorsContextType = {
  sectors: [],
  fetchSectors: () => null,
}

export const SectorsContext = createContext<SectorsContextType>(sectorsDefaultValue);