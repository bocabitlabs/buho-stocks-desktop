import DividendDAO from "../database/daos/dividend-dao";
import { DividendItemProps } from "../types/dividend";

export default class DividendService {
  addDividend = (dividend: DividendItemProps) => {
    return new DividendDAO().addDividend(dividend);
  };

  getAll = (companyId: string) => {
    return new DividendDAO().getDividends(companyId);
  };

  getDividendsPerYearByCompanyId = (companyId: string) => {
    return new DividendDAO().getDividendsPerYearByCompanyId(companyId);
  };

  getDividendsByCompanyId = (companyId: string) => {
    return new DividendDAO().getDividendsByCompanyId(companyId);
  }

  deleteById = (shareId: string) => {
    return new DividendDAO().deleteById(shareId);
  };
}
