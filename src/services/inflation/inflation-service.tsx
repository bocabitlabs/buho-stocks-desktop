import InflationDAO from "../../database/daos/inflation-dao";
import { InflationItemProps } from "../../types/inflation";

const add = (inflation: InflationItemProps) => {
  return InflationDAO.addInflation(inflation);
};

const deleteById = (inflationId: string) => {
  return InflationDAO.deleteById(inflationId);
};

const getAll = () => {
  return InflationDAO.getAll();
};

const getInflationsForYear = (year: number) => {
  return InflationDAO.getInflationsForYear(year);
};

const exportedModule = {
  add,
  deleteById,
  getAll,
  getInflationsForYear
};

export default exportedModule;
