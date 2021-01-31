import { useState, useEffect, useCallback } from "react";
import { CompaniesContextType } from "../contexts/companies";
import CompanyService from "../services/company-service";
import { CompanyFormFields, ICompany } from "../types/company";

export function useCompaniesContext(portfolioId: string): CompaniesContextType {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [company, setCompany] = useState<ICompany | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = useCallback((portfolioId: string) => {
    setIsLoading(true);
    console.log("Loading companies on CompaniesHook...")
    const result = new CompanyService().getCompanies(portfolioId);
    setCompanies(result);
    console.log(result)
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    console.log("Loading companies on CompaniesHook...")

    const result = new CompanyService().getCompanies(portfolioId);
    console.log(result)

    setCompanies(result);
    setIsLoading(false);
  }, [portfolioId]);

  const fetchCompany = useCallback((companyId: string) => {
    setIsLoading(true);
    const result = new CompanyService().getCompanyDetails(companyId);
    setCompany(result);
    setIsLoading(false);
  }, []);

  const addCompany = useCallback((company: CompanyFormFields) => {
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
