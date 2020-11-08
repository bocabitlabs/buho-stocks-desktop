import { useState, useCallback } from "react";
import { CompaniesContextType } from "../contexts/companies";
import CompanyService from "../services/company-service";
import { CompanyFields, CompanyItemProps } from "../types/company";

export function useCompaniesContext(): CompaniesContextType {
  const [companies, setCompanies] = useState<CompanyFields[]>([]);
  const [company, setCompany] = useState<CompanyFields|null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = useCallback((portfolioId: string) => {
    setIsLoading(true);
    new CompanyService().getCompanies(portfolioId, getCallback);
  }, [])

  const getCallback = (result: CompanyFields[]) => {
    setCompanies(result)
    setIsLoading(false);
  };

  const fetchCompany = useCallback((companyId: string) => {
    setIsLoading(true);
    new CompanyService().getCompany(companyId, getSingleCallback);
  }, [])

  const getSingleCallback = (result: CompanyFields) => {
    setCompany(result)
    setIsLoading(false);
  };

  const addCompany = useCallback((company: CompanyItemProps) => {

    const addCompanyCallback = (result: []) => {
      fetchCompanies(company.portfolio)
      console.log(result);
      setIsLoading(false);
    };

    setIsLoading(true);
    new CompanyService().addCompany(company, addCompanyCallback);
  }, [fetchCompanies])

  return {
    companies,
    company,
    // portfolio,
    isLoading,
    fetchCompanies,
    fetchCompany,
    // fetchPortfolio,
    addCompany
    // removePost
  }
}