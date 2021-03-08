import { createContext } from "react";
import { IAddProps } from "types/common";
import { Sector, SectorFormFields } from "types/sector";

export type SectorsContextType = {
  sector: Sector|null;
  sectors: Sector[];
  isLoading: boolean;
  fetchSectors: () => void;
  addSector: (sector: SectorFormFields) => IAddProps;
  getById: (currencyId: string) => Sector | null;
  update: (currencyId: string, sector: SectorFormFields) => IAddProps;
};

export const sectorsDefaultValue: SectorsContextType = {
  sector: null,
  sectors: [],
  isLoading: false,
  fetchSectors: () => null,
  addSector: () => ({ changes: false }),
  getById: (): Sector | null => null,
  update: () => ({ changes: false })
};

export const SectorsContext = createContext<SectorsContextType>(
  sectorsDefaultValue
);
