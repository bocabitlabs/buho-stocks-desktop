import { useState, useEffect } from "react";
import { CompanyContextType } from "../contexts/company";
import CompanyService from "../services/company-service";
import { CompanyFields } from "../types/company";

export function useCompanyContext(companyId: string): CompanyContextType {
  const [company, setCompany] = useState<CompanyFields | null>(null);

  useEffect(() => {
    const result = new CompanyService().getCompany(companyId);
    setCompany(result);
  }, [companyId])

  return {
    company
  };
}