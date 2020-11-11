import { useState, useCallback } from "react";
import { CompaniesContextType } from "../contexts/companies";
import CompanyService from "../services/company-service";
import { CompanyFields } from "../types/company";

export function useCompaniesContext(): CompaniesContextType {
  const [companies, setCompanies] = useState<CompanyFields[]>([]);
  const [company, setCompany] = useState<CompanyFields | null>(null);

  const fetchCompanies = useCallback((portfolioId: string) => {
    const result = new CompanyService().getCompanies(portfolioId);
    setCompanies(result);
  }, []);

  const fetchCompany = useCallback((companyId: string) => {
    const result = new CompanyService().getCompany(companyId);
    setCompany(result);
  }, []);

  // const addCompany = useCallback((company: CompanyItemProps) => {

  //   const addCompanyCallback = (result: []) => {
  //     fetchCompanies(company.portfolio)
  //     console.log(result);
  //     setIsLoading(false);
  //   };

  //   setIsLoading(true);
  //   new CompanyService().addCompany(company, addCompanyCallback);
  // }, [fetchCompanies])

  return {
    companies,
    company,
    // portfolio,
    fetchCompanies,
    fetchCompany
    // fetchPortfolio,
    // addCompany
    // removePost
  };
}
