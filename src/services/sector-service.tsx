import SectorDAO from "../database/daos/sector-dao";
import { SectorItemProps } from "../types/sector";

export default class SectorService {
  addSector = (company: SectorItemProps) => {
    return new SectorDAO().addSector(company);
  };

  getSectors = () => {
    return new SectorDAO().getSectors();
  };

  getById = (sectorId: string) => {
    return new SectorDAO().getById(sectorId);
  };

  deleteById = (sectorId: string) => {
    return new SectorDAO().deleteById(sectorId);
  };
}
