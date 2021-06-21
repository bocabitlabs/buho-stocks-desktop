import { createContext } from "react";
import { IAddProps } from "types/common";
import { ISector, SectorFormFields } from "types/sector";

export type SectorsContextType = {
  sector: ISector|null;
  sectors: ISector[];
  isLoading: boolean;
  getAll: () => ISector[];
  create: (sector: SectorFormFields) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getById: (currencyId: string) => ISector | null;
  update: (currencyId: string, sector: SectorFormFields) => IAddProps;
};

export const sectorsDefaultValue: SectorsContextType = {
  sector: null,
  sectors: [],
  isLoading: false,
  getAll: () => [],
  create: () => ({ changes: false }),
  deleteById: () => ({ changes: false }),
  getById: (): ISector | null => null,
  update: () => ({ changes: false })
};

export const SectorsContext = createContext<SectorsContextType>(
  sectorsDefaultValue
);
