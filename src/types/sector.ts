export interface SectorFormFields {
  name: string;
  color: string;
  isSuperSector: boolean;
  superSectorId?: number;
}

export interface ISector extends SectorFormFields {
  id: string;
  superSectorName: string;
}