import SectorDAO from "../database/daos/sector-dao";
import { SectorItemProps } from "../types/sector";

export default class SectorService {
  addSector = (company: SectorItemProps) => {
    return new SectorDAO().addSector(company);
  };

  getSectors = () => {
    return new SectorDAO().getSectors();
  };

  getSectorById = (sectorId: string) => {
    return new SectorDAO().getSectorById(sectorId);
  };

  deleteSectorById = (sectorId: string) => {
    return new SectorDAO().deleteSectorById(sectorId);
  };
}
