import InflationDAO from "database/daos/inflation-dao";
import { InflationFormFields } from "types/inflation";

class InflationService {
  static add = (inflation: InflationFormFields) => {
    return InflationDAO.addInflation(inflation);
  };
  static deleteById = (inflationId: string) => {
    return InflationDAO.deleteById(inflationId);
  };

  static getAll = () => {
    return InflationDAO.getAll();
  };

  static getInflationsForYear = (year: number) => {
    return InflationDAO.getInflationsForYear(year);
  };

}

export default InflationService;
