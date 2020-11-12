import { createContext } from "react";
import { SectorFields } from "../types/sector";

export type SectorsContextType = {
  sectors: SectorFields[];
};

export const sectorsDefaultValue: SectorsContextType = {
  sectors: []
};

export const SectorsContext = createContext<SectorsContextType>(
  sectorsDefaultValue
);
