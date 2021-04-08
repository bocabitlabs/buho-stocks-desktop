import { createContext } from "react";
import { IAddProps } from "types/common";
import { ISector, SectorFormFields } from "types/sector";

export type SectorsContextType = {
  sector: ISector|null;
  sectors: ISector[];
  isLoading: boolean;
  fetchSectors: () => ISector[];
  create: (sector: SectorFormFields) => IAddProps;
  getById: (currencyId: string) => ISector | null;
  update: (currencyId: string, sector: SectorFormFields) => IAddProps;
};

export const sectorsDefaultValue: SectorsContextType = {
  sector: null,
  sectors: [],
  isLoading: false,
  fetchSectors: () => [],
  create: () => ({ changes: false }),
  getById: (): ISector | null => null,
  update: () => ({ changes: false })
};

export const SectorsContext = createContext<SectorsContextType>(
  sectorsDefaultValue
);
