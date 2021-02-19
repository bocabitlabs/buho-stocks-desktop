import InflationDAO from "database/daos/inflation-dao";
import { Inflation, InflationFormFields } from "types/inflation";

class InflationService {
  static add = (inflation: InflationFormFields) => {
    return InflationDAO.addInflation(inflation);
  };
  static deleteById = (inflationId: string) => {
    return InflationDAO.deleteById(inflationId);
  };

  static exportAll = (): Inflation[] => {
    const results = InflationDAO.exportAll();
    return results;
  };

  static getByYear = (year: number) => {
    return InflationDAO.getByYear(year);
  };

  static getAll = () => {
    return InflationDAO.getAll();
  };

  static getInflationsForYear = (year: number): Inflation[] => {
    return InflationDAO.getInflationsForYear(year);
  };

  /**
   * Calculate the inflation and the accumulated inflation for a given year in the yearlyOperations array
   * @param year
   */
  static calculateInflationForYear = (year: string) => {
    const inflationsForYear = InflationService.getInflationsForYear(
      parseInt(year)
    );
    let accumulatedInflation = 0;
    let count = 0;
    if (Array.isArray(inflationsForYear)) {
      inflationsForYear.forEach((inflation: Inflation) => {
        if (inflation.year <= parseInt(year)) {
          if (count === 0) {
            accumulatedInflation = inflation.percentage / 100;
          } else {
            let currentInflation = inflation.percentage / 100;
            accumulatedInflation +=
              currentInflation * (1 + accumulatedInflation);
          }
        }
        // console.log(`Inflation for year ${inflation.year}=${accumulatedInflation}`)
        count++;
      });
    }

    return accumulatedInflation;
  };
}

export default InflationService;
