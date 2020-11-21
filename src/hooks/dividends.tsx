import { useState, useEffect } from "react";
import { DividendsContextType } from "../contexts/dividends";
import DividendService from "../services/dividend-service";
import { DividendFields } from "../types/dividend";

export function useDividendsContext(companyId: string): DividendsContextType {
  const [dividends, setDividends] = useState<DividendFields[]>([]);

  useEffect(() => {
    const results = new DividendService().getAll(companyId);
    setDividends(results);
  }, [companyId])

  return {
    dividends,
  };
}