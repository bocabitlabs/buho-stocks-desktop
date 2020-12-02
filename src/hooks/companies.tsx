import { useState, useEffect, useCallback } from "react";
import { CompaniesContextType } from "../contexts/companies";
import CompanyService from "../services/company-service";
import { CompanyFields, CompanyItemProps } from "../types/company";

export function useCompaniesContext(portfolioId: string): CompaniesContextType {
  const [companies, setCompanies] = useState<CompanyFields[]>([]);
  const [company, setCompany] = useState<CompanyFields | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = useCallback((portfolioId: string) => {
    setIsLoading(true);
    const result = new CompanyService().getCompanies(portfolioId);
    setCompanies(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const result = new CompanyService().getCompanies(portfolioId);
    setCompanies(result);
    setIsLoading(false);
  }, [portfolioId]);

  const fetchCompany = useCallback((companyId: string) => {
    setIsLoading(true);
    const result = new CompanyService().getCompany(companyId);
    setCompany(result);
    setIsLoading(false);
  }, []);

  const addCompany = useCallback((company: CompanyItemProps) => {
    setIsLoading(true);
    const result = new CompanyService().addCompany(company);
    setIsLoading(false);
    return result;
  }, []);

  return {
    companies,
    company,
    isLoading,
    fetchCompanies,
    fetchCompany,
    addCompany
  };
}
