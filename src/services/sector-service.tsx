import SectorDAO from "database/daos/sector-dao";
import { Sector, SectorFormFields } from "types/sector";

export default class SectorService {
  static addSector = (company: SectorFormFields) => {
    return SectorDAO.addSector(company);
  };

  static exportAll = (): Sector[] => {
    const results = SectorDAO.exportAll();
    return results;
  };

  static getSectors = () => {
    return SectorDAO.getSectors();
  };

  static getById = (sectorId: string) => {
    return SectorDAO.getById(sectorId);
  };

  static getByName = (sectorName: string) => {
    return SectorDAO.getByName(sectorName);
  };

  static deleteById = (sectorId: string) => {
    return SectorDAO.deleteById(sectorId);
  };
}
