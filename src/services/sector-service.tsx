import SectorDAO from "database/daos/sector-dao";
import { SectorFormFields } from "types/sector";

export default class SectorService {
  static addSector = (company: SectorFormFields) => {
    return SectorDAO.addSector(company);
  };

  static getSectors = () => {
    return SectorDAO.getSectors();
  };

  static getById = (sectorId: string) => {
    return SectorDAO.getById(sectorId);
  };

  static deleteById = (sectorId: string) => {
    return SectorDAO.deleteById(sectorId);
  };
}
