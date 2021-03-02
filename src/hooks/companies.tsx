import { useState, useEffect, useCallback } from "react";
import { IAddProps } from "types/common";
import { CompaniesContextType } from "contexts/companies";
import CompanyService from "services/company-service";
import { CompanyFormFields, ICompany } from "types/company";

export function useCompaniesContext(portfolioId: string): CompaniesContextType {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [company, setCompany] = useState<ICompany | null>(null);

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
    const result = new CompanyService().getCompanyDetails(companyId);
    setCompany(result);
    setIsLoading(false);
    return result;
  }, []);

  const addCompany = useCallback((company: CompanyFormFields): IAddProps => {
    setIsLoading(true);
    const result = new CompanyService().addCompany(company);
    setIsLoading(false);
    return result;
  }, []);

  const deleteById = useCallback((companyId: string) => {
    setIsLoading(true);
    const results = new CompanyService().deleteById(companyId);
    setIsLoading(false);
    return results;
  }, []);

  const update = useCallback((companyId: string, company: CompanyFormFields) => {
    setIsLoading(true);
    const result = new CompanyService().update(companyId, company);
    setIsLoading(false);
    return result;
  }, []);

  return {
    companies,
    company,
    isLoading,
    fetchCompanies,
    fetchCompany,
    addCompany,
    deleteById,
    update
  };
}
