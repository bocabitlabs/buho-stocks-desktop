export interface SectorFormFields {
  name: string;
  color: string;
  isSuperSector: boolean;
  superSectorId?: number;
}

export interface Sector extends SectorFormFields {
  id: string;
  superSectorName: string;
}