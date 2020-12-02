import InflationDAO from "../database/daos/inflation-dao";
import { InflationItemProps } from "../types/inflation";

export default class InflationService {
  add = (inflation: InflationItemProps) => {
    return new InflationDAO().addInflation(inflation);
  };

  getAll = () => {
    return new InflationDAO().getAll();
  };

  getInflatioForYear = (year: number) => {
    return new InflationDAO().getInflatioForYear(year);
  }

  deleteById = (inflationId: string) => {
    return new InflationDAO().deleteById(inflationId);
  };

}