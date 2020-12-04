import InflationDAO from "../../database/daos/inflation-dao";
import { InflationItemProps } from "../../types/inflation";

const add = (inflation: InflationItemProps) => {
  return new InflationDAO().addInflation(inflation);
};

const deleteById = (inflationId: string) => {
  return new InflationDAO().deleteById(inflationId);
};

const getAll = () => {
  return new InflationDAO().getAll();
};

const getInflationsForYear = (year: number) => {
  return new InflationDAO().getInflationsForYear(year);
};

const exportedModule = {
  add,
  deleteById,
  getAll,
  getInflationsForYear
};

export default exportedModule;

// export default ;

// export default class InflationService {

//   getAll = () => {
//     return new InflationDAO().getAll();
//   };

//   static getInflationsForYear = (year: number) => {
//     return new InflationDAO().getInflationsForYear(year);
//   }

//   deleteById = (inflationId: string) => {
//     return new InflationDAO().deleteById(inflationId);
//   };

// }
