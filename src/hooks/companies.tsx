import { useState, useEffect } from "react";
import { CompaniesContextType } from "../contexts/companies";
import CompanyService from "../services/company-service";
import { CompanyFields } from "../types/company";

export function useCompaniesContext(portfolioId: string): CompaniesContextType {
  const [companies, setCompanies] = useState<CompanyFields[]>([]);

  useEffect(() => {
    const result = new CompanyService().getCompanies(portfolioId);
    setCompanies(result);
  }, [])

  return {
    companies
  };
}
