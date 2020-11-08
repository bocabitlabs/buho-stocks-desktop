import SectorDAO from "../database/daos/sector-dao";
import { SectorItemProps } from "../types/sector";

export default class SectorService {
  addSector = (company: SectorItemProps, callback: Function) => {
    new SectorDAO().addSector(company, callback);
  };

  getSectors = (callback: Function) => {
    new SectorDAO().getSectors(callback);
  };

  getSectorById = (sectorId: string, callback: Function) => {
    new SectorDAO().getSectorById(sectorId, callback);
  };
}
