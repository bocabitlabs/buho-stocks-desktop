import InflationDAO from "../../database/daos/inflation-dao";
import { InflationItemProps } from "../../types/inflation";

class InflationService {
  static add = (inflation: InflationItemProps) => {
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
