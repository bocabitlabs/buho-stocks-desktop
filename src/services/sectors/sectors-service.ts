import SectorDAO from "database/daos/sectors/sectors-dao";
import { ISector, SectorFormFields } from "types/sector";

export default class SectorsService {
  static create = (company: SectorFormFields) => {
    return SectorDAO.create(company);
  };

  static exportAll = (): ISector[] => {
    const results = SectorDAO.exportAll();
    return results;
  };

  static getAll = () => {
    return SectorDAO.getAll();
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

  static update = (id: string, currency: SectorFormFields) => {
    return SectorDAO.update(id, currency);
  };
}
